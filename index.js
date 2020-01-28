const csv = require('csvtojson');
const fs = require('fs');

let releases = [];
let bundles = [];

// This is the main which gets called once. Everything else runs from here.
const main = () => {
  fs.readdir("./csv", (err, files) => {
    files.forEach(file => {
      if (file !== ".csv"){
        console.log(file);
        fileConverter("csv/"+file);
      }
    });
  }); 
}


const fileConverter = (filePath) => {
  csv({delimiter:";",})
  .fromFile(filePath)
  .then((dataArray)=>{
    console.log("array length before", releases.length);
    console.log("array length before", bundles.length);

    //1. Get all the different ISRC and associated trackTitles.
    dataArray.forEach(elem => {
      addRelease(elem);
      addCompilation(elem);
    });

    //2. Get all the royalties for each ISRC
    dataArray.forEach(elem => {
      let royalty = parseFloat(elem.Royalty_Paid.replace(/,/g, '.'));
      addRoyaltyToRelease(elem, royalty);
      addRoyaltyToBundle(elem, royalty);
    });
    createReleasesCSV(filePath);
    createBundlesCSV(filePath);
    testSum();
    // clear arrays
    releases = []
    bundles = []
  });
}

const addRelease = (elem) => {
  let positionInIsrcArray = releases.map(e => e.isrc).indexOf(elem.ISRC);
  if (elem.ISRC && positionInIsrcArray === -1){
    releases.push({
      title: elem.TrackTitle,
      isrc: elem.ISRC,
      artist: elem.TrackArtist,
      royalty: 0
    });    
  }
}

const addCompilation = (elem) => {
  let positionInBundlesArray = bundles.map(e => e.catalogNo).indexOf(elem.CATALOG_NO);
    if(elem.ISRC.trim() === "" && positionInBundlesArray === -1) {
      bundles.push({
          catalogNo: elem.CATALOG_NO,
          royalty: 0
      });
    }
}

const addRoyaltyToRelease = (elem, royalty) => {
  if(elem.ISRC && royalty){
    let positionInIsrcArray = releases.map(e => e.isrc).indexOf(elem.ISRC);
    releases[positionInIsrcArray].royalty += royalty;
  }
}

const addRoyaltyToBundle = (elem, royalty) => {
    if(elem.ISRC.trim() == "" && royalty){
      let positionInBundlesArray = bundles.map(e => e.catalogNo).indexOf(elem.CATALOG_NO);
      bundles[positionInBundlesArray].royalty += royalty;
    }
}

const testSum = () => {
  let result = 0;
  releases.forEach(elem => {
    result += elem.royalty;
  });
  bundles.forEach(elem => {
    result += elem.royalty;
  });
  console.log(result);
}

const createReleasesCSV = (filePath) => {
  let csvString = "artist,title,isrc,royalties\n";
  releases.forEach(elem => {
    //transform back to a comma decimal and get rid of rounding errors
    let royaltyString = Number(elem.royalty).toFixed(5).toString().replace(".", ","); 
    let newString = `"${elem.artist}","${elem.title}","${elem.isrc}","${royaltyString}"\n`;
    csvString += newString;
  });
  fs.writeFile(`${__dirname}/target/RELEASES_${filePath.replace('csv/', '')}`, csvString,  (err) => {
    if (err) throw err;
    console.log(`RELEASES_${filePath.replace('csv/', '')} is created successfully.`);
  }); 
}


const createBundlesCSV = (filePath) => {
  let csvString = "catalogNo,royalties\n";
  bundles.forEach(elem => {
    //transform back to a comma decimal and get rid of rounding errors
    let royaltyString = Number(elem.royalty).toFixed(5).toString().replace(".", ","); 
    let newString = `"${elem.catalogNo}","${royaltyString}"\n`;
    csvString += newString;
  });
  fs.writeFile(`${__dirname}/target/BUNDLES_${filePath.replace('csv/', '')}`, csvString,  (err) => {
    if (err) throw err;
    console.log(`BUNDLES_${filePath.replace('csv/', '')} is created successfully.`);
  }); 
}


main();