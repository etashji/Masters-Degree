import * as products from "./data/products.js";
import * as reviews from "./data/reviews.js";

//product 1

const populate = async () => {
    try {
        var product1 = await products.create(
            "Acid", 
            "As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d6 acid damage.",
            "AG251",
            24.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Thrown", "Acidic"],
            ["General Goods", "Advanced"],
            "03/14/1297",
            true);
            console.log(product1);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 1
    
    //Review 1
    try {
        const review1 = await reviews.createReview(
            product1._id,
            "Best Acid Ever!",
            "Random Merchant",
            "I used this acid on bandits who were trying to rob my shop. They ran away screaming in horror, as their friend's face melted off. They never tried to rob my shop again. I would definitely recommend this product.",
            5
        );
        console.log(review1);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review2 = await reviews.createReview(
            product1._id,
            "Burned my Hands",
            "Dumb Merchant",
            "I tried to use this acid on some bandits, but the bottle broke and accidently burnt my fingers off. Definitely would not recommend this product.",
            1
        );
        console.log(review2);    
    } catch(e) {
        console.log(e);
    }
    
    //Product 2
    try {
        var product2 = await products.create(
            "Alchemist's Fire", 
            "This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.",
            "AG501",
            49.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Thrown", "Fire"],
            ["General Goods", "Advanced"],
            "03/14/1297",
            true);
            console.log(product2);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 2
    
    //Review 1
    try {
        const review3 = await reviews.createReview(
            product2._id,
            "It Works, I Guess",
            "Sad Merchant",
            "I bought this alchemist's fire to use on bandits who were trying to rob my shop. Of course, they can't rob the shop if there isn't a shop to rob.",
            3
        );
        console.log(review3);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review4 = await reviews.createReview(
            product2._id,
            "Confusing Product",
            "Dumb Merchant",
            "How do you open the flask?",
            1
        );
        console.log(review4);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 3
    try {
        const review5 = await reviews.createReview(
            product2._id,
            "Best Product",
            "Gormsh",
            "Gormsh like fire!",
            5
        );
        console.log(review5);    
    } catch(e) {
        console.log(e);
    }
    
    //product 3
    try {
        var product3 = await products.create(
            "Antitoxin", 
            "A creature that drinks this vial of liquid gains advantage on saving throws against being poisoned for 1 hour. It confers no benefit to undead or constructs.",
            "AG50",
            49.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Healing", "Vial"],
            ["General Goods", "Healing"],
            "03/14/1297",
            true);
            console.log(product3);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 3
    
    //Review 1
    try {
        const review6 = await reviews.createReview(
            product3._id,
            "Doesn't Work",
            "Dumb Adventurer",
            "I drank this antitoxin before going on an adventure. I then got bit by a snake and died. I got better, but still, come on.",
            1
        );
        console.log(review6);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review7 = await reviews.createReview(
            product3._id,
            "Works Like a Charm",
            "Smart Adventurer",
            "It does exactly what it says it does.",
            5
        );
        console.log(review7);    
    } catch(e) {
        console.log(e);
    }
    
    //product 4
    try {
        var product4 = await products.create(
            "Arcane Focus", 
            "An arcane focus is a special item -- an orb, a crystal, a rod, a specially constructed staff, designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus.",
            "AG50",
            19.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Arcane", "Magical"],
            ["General Goods", "Magical"],
            "03/14/1297",
            true);
            console.log(product4);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 4
    
    //Review 1
    try {
        const review8 = await reviews.createReview(
            product4._id,
            "Works Great!",
            "Merlin",
            "I use my arcane focus all the time, whether it's to improve my relationships, or help King Arthur fend off the heathen Saxon invaders.",
            5
        );
        console.log(review8);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review9 = await reviews.createReview(
            product4._id,
            "Fool of a Product!",
            "Gandalf the Wise",
            "Poppycock! I don't need an arcane focus to cast my spells. I once fought a Balrog single-handed without one. This product SHALL NOT PASS!",
            1
        );
        console.log(review9);    
    } catch(e) {
        console.log(e);
    }
    
    //product 5
    try {
        var product5 = await products.create(
            "Ball Bearings", 
            "As an action, you can spill these tiny metal balls from their pouch to cover a level, square are that is 10 feet on a side. A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone. A creature moving through the area at half speed doesn't need to make the save.",
            "AG50",
            .99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Bag", "Tricks", "Thieves"],
            ["General Goods", "Special"],
            "03/14/1297",
            true);
            console.log(product5);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 5
    
    //Review 1
    try {
        const review10 = await reviews.createReview(
            product5._id,
            "Fun time!",
            "Random Theif",
            "I used these after robbing the general store of everything else. You should have seen the looks on the owner's faces as they kept getting up and falling down!",
            5
        );
        console.log(review10);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review11 = await reviews.createReview(
            product5._id,
            "Didn't Work",
            "Wiley Coyote",
            "I tried to use these to catch road runner, but instead, I tripped, and fell, and then an anvil landed on my head, and I exploded.",
            1
        );
        console.log(review11);    
    } catch(e) {
        console.log(e);
    }
    
    //product 6
    try {
        var product6 = await products.create(
            "Block and Tackle", 
            "A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift.",
            "AG15",
            24.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Construction", "Multi"],
            ["General Goods", "Mundane"],
            "03/14/1297",
            true);
            console.log(product1);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 6
    
    //Review 1
    try {
        const review12 = await reviews.createReview(
            product6._id,
            "Works Great!",
            "Bran the Builder",
            "This does exactly what it's supposed to do. I used it to build the Wall of Westeros. Would definitely recommend.",
            5
        );
        console.log(review12);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review13 = await reviews.createReview(
            product6._id,
            "What is it?",
            "Shmandalf the Shtupid",
            "I bought this, but don't know what it is.",
            3
        );
        console.log(review13);    
    } catch(e) {
        console.log(e);
    }
    
    //product 7
    try {
        var product7 = await products.create(
            "Book", 
            "It's a book. What do you think it does?!",
            "AG255",
            24.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Books", "Reading"],
            ["General Goods", "Mundane"],
            "03/14/1297",
            true);
            console.log(product7);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 7
    
    //Review 1
    try {
        const review14 = await reviews.createReview(
            product7._id,
            "Used For Writing",
            "JRR Tolkien",
            "I used this to write the Lord of the Rings. Solid and sturdy. Just like my old commander during the War.",
            5
        );
        console.log(review14);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review15 = await reviews.createReview(
            product7._id,
            "What it say?",
            "Grumsh",
            "Grumsh can't read.",
            1
        );
        console.log(review15);    
    } catch(e) {
        console.log(e);
    }
    
    //product 8
    try {
        var product8 = await products.create(
            "Caltrops", 
            "As an action, you can spread a bag of caltrops to cover a square area that is 5 feet on a side. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving this turn and take 1 piercing damage. Taking this damage reduces the creature's walking speed by 10 feet until the creature regains at least 1 hit point. A creature moving through the area at half speed doesn't need to make the save.",
            "AG12",
            24.99,
            "Neverwinter Caravanserai",
            "http://www.NeverwinterCaravanserai.com",
            ["Misc.", "Tricks"],
            ["General Goods", "Special"],
            "03/14/1297",
            true);
            console.log(product8);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 8
    
    //Review 1
    try {
        const review16 = await reviews.createReview(
            product8._id,
            "I mean, they work I guess.",
            "Disappointed Thief",
            "I used these while escaping from the guards. They worked, but weren't as fun as the ball bearings.",
            3
        );
        console.log(review16);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review17 = await reviews.createReview(
            product8._id,
            "Bad Toy",
            "Disgruntled Boomer",
            "I got these for my child, but they make my feet hurt worse than legos.",
            1
        );
        console.log(review17);    
    } catch(e) {
        console.log(e);
    }
    
    //product 9
    try {
        var product9 = await products.create(
            "Cortana - Personal Assistant", 
            "Whether you need to prevent the Covenant from using Halo to wipe out all life in the galaxy, or just need someone to talk to, Cortana is always there for you.",
            "John117",
            117.99,
            "Halo Store",
            "http://www.HaloStore.com",
            ["AI", "Forerunner"],
            ["General Goods", "Electronics"],
            "03/14/2024",
            true);
            console.log(product9);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 9
    
    //Review 1
    try {
        const review18 = await reviews.createReview(
            product9._id,
            "Perfect",
            "Master Chief",
            "Cortana helped me stop the Covenant from wiping out all life in the galaxy, and she does my taxes!",
            5
        );
        console.log(review18);    
    } catch(e) {
        console.log(e);
    }
    
    //Review 2
    try {
        const review19 = await reviews.createReview(
            product9._id,
            "Helped My Friend",
            "Arbiter",
            "I got this for my friend, Master chief. She was really helpful!",
            5
        );
        console.log(review19);    
    } catch(e) {
        console.log(e);
    }
    
    //Product 10
    try {
        var product10 = await products.create(
            "83 inch LG C3 OLED TV", 
            "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
            "OLED83C3PUA",
            4757.29,
            "LG",
            "http://www.lgelectronics.com",
            ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],
            ["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
            "02/27/2023",
            false);
            console.log(product10);
    } catch(e) {
        console.log(e);
    }
    
    //Reviews for product 10
    
    //Review 1
    try {
        const review20 = await reviews.createReview(
            product10._id,
            "Wow!!",
            "Patrick Hill",
            "This TV was amazing! I don't know how I'll ever go back after experiencing OLED!",
            5
        );
        console.log(review20);    
    } catch(e) {
        console.log(e);
    }
    return "Populated with 10 products, with a combined total of 20 reviews.";
}

export {populate};