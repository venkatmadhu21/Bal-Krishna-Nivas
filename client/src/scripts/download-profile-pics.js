const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create the profiles directory if it doesn't exist
const profilesDir = path.join(__dirname, '../../public/images/profiles');
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir, { recursive: true });
  console.log(`Created directory: ${profilesDir}`);
}

// Sample profile picture URLs (using placeholder images)
const maleProfileUrls = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/men/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/men/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/men/8.jpg',
];

const femaleProfileUrls = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/women/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/women/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
];

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
};

// Download all profile pictures
const downloadAllImages = async () => {
  const downloads = [];
  
  // Download male profile pictures
  for (let i = 0; i < maleProfileUrls.length; i++) {
    const filename = path.join(profilesDir, `male${i + 1}.jpg`);
    downloads.push(downloadImage(maleProfileUrls[i], filename));
  }
  
  // Download female profile pictures
  for (let i = 0; i < femaleProfileUrls.length; i++) {
    const filename = path.join(profilesDir, `female${i + 1}.jpg`);
    downloads.push(downloadImage(femaleProfileUrls[i], filename));
  }
  
  // Wait for all downloads to complete
  try {
    await Promise.all(downloads);
    console.log('All profile pictures downloaded successfully!');
  } catch (error) {
    console.error('Error downloading profile pictures:', error);
  }
};

// Run the download function
downloadAllImages();