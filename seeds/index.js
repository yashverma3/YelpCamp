const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://yashverma_3:251198@cluster0.kvnhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("Database connected");
}).on('error',(error)=>{
        console.log('Connection error',error);
    });

    const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<0;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: "62a3854b1d1e7486b5a19840",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, necessitatibus delectus? Cum aspernatur, ut est nam eius maxime asperiores reiciendis facilis officia nemo maiores, voluptas eos accusamus, alias facere at?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dhpowrohp/image/upload/v1645357295/YelpCamp/nspg5mnxpw2eyuwmchrr.jpg',
                  filename: 'YelpCamp/nspg5mnxpw2eyuwmchrr'
                },
                {
                  url: 'https://res.cloudinary.com/dhpowrohp/image/upload/v1645357308/YelpCamp/lnuiylw8nhvalme77svz.jpg',
                  filename: 'YelpCamp/lnuiylw8nhvalme77svz'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})