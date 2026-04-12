const mongoose = require('mongoose'); 
async function run() { 
    await mongoose.connect('mongodb+srv://shoaib_db_project:Numberone1@myportfolio.jfidsya.mongodb.net/portfolio-cms?appName=MyPortfolio'); 
    const cs = await mongoose.connection.db.collection('case-studies').findOne({ images: { $exists: true, $type: 'array', $not: {$size: 0} } }); 
    if(!cs) { 
        console.log('No Case Study with images field!'); 
        return process.exit(0); 
    } 
    const medId = cs.images[0].image; 
    const media = await mongoose.connection.db.collection('media').findOne({ _id: medId }); 
    console.log('CS:', cs.title, 'Media URL:', media ? media.url : 'Media completely missing!'); 
    process.exit(0); 
} 
run().catch(console.error);
