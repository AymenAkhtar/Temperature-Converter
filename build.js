// build.js - Build script for Temperature Converter
const fs = require('fs');
const path = require('path');

console.log('🔨 Building Temperature Converter Application...');

// Create dist directory if not exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✓ Created dist directory');
}

// Files to copy to distribution
const filesToCopy = ['index.js', 'package.json', 'test.js'];
let copiedCount = 0;

filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(distDir, file));
        console.log(`✓ Copied ${file}`);
        copiedCount++;
    } else {
        console.log(`⚠️  ${file} not found, skipping`);
    }
});

// Create build information
const buildInfo = {
    project: 'Temperature Converter',
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    buildNumber: process.env.BUILD_NUMBER || 'local',
    nodeVersion: process.version,
    filesIncluded: filesToCopy
};

fs.writeFileSync(
    path.join(distDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
);
console.log('✓ Created build-info.json');

// Create a simple README for the build
const readmeContent = `# Temperature Converter Build

This is the built version of the Temperature Converter application.

## Included Files:
- index.js - Main application
- package.json - Dependencies and scripts  
- test.js - Test cases
- build-info.json - Build metadata

## Usage:
node index.js

Build Date: ${new Date().toLocaleString()}
`;

fs.writeFileSync(path.join(distDir, 'README.md'), readmeContent);
console.log('✓ Created README.md');

console.log(`🎉 Build completed successfully!`);
console.log(`📁 Output: ${distDir}`);
console.log(`📄 Files copied: ${copiedCount}/${filesToCopy.length}`);
console.log(`📦 Ready for deployment!`);