require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      //make sure to change this before app goes live
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(`
    drop table if exists creatures;
    drop table if exists stats;
    drop table if exists attacks;
    drop table if exists images;

    CREATE TABLE creatures(
        creature_id SERIAL PRIMARY KEY,
        creature_name VARCHAR(100),
        creature_hp INT,
        creature_ac INT,
        creature_speed VARCHAR(20),
        creature_cr VARCHAR(20),
        description VARCHAR(500)
    );

    CREATE TABLE stats(
        stat_id SERIAL PRIMARY KEY,
        creature_id INT NOT NULL REFERENCES creatures(creature_id),
        strength INT,
        dex INT,
        con INT,
        intell INT,
        wis INT,
        char INT
    );

    CREATE TABLE attacks(
        attack_id SERIAL PRIMARY KEY,
        creature_id INT NOT NULL REFERENCES creatures(creature_id),
        attack_name VARCHAR(50),
        to_hit INT,
        die_size INT,
        num_die INT,
        description VARCHAR(200)
    );

    CREATE TABLE images(
        image_id SERIAL PRIMARY KEY,
        creature_id INT NOT NULL REFERENCES creatures(creature_id),
        imageURL VARCHAR(400),
        alt_text VARCHAR(50)
    );

    INSERT INTO creatures(creature_name, creature_hp, creature_ac, creature_speed,creature_cr,description)
    VALUES('Giant Constrictor Snake', 60, 12,'30 ft.,swim 30ft.', '2', 'A gargantuan Snake with shimmering emerald scales' ),
          ('Allosaurus', 51, 13, '60 ft.', '2', 'Pounce: if it moves at least 30 feet straight toward a creature and then hits it with a claw attack, target must make a DC 13 Strength saving throw or be knocked prone, it can then make one bite attack as a bonus action.'),
          ('Deinonychus', 26,13,'40 ft.', '1','Pounce: if it moves at least 20 feet straight toward a creature and then hits it with a claw attack, target must make a DC 12 Strength saving throw or be knocked prone, it can then make one bite attack as a bonus action.),' ),
          ('Dire Wolf', 37, 14, '50 ft.', '1','Adv on perception that relies on smell. Pack Tactics: Advantage on an attack roll if at least one ally within five feet.'),
          ('Elk', 13, 10, '50 ft.', '1/4', 'Charge. If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7(2d6) damage. If the target is a creature, it must succeed on a dc 13 strength saving throw or be knocked prone.'),
          ('Giant Dragonfly', 22, 16, '10 ft., fly 60 ft.', '1/2', 'Drone. When it beats it wings, the dragonfly emits a load droning sound that can be heard out to a range of 120 feet. reaction: uncanny dodge.'),
          ('Giant Eagle', 26, 13, '10 ft. fly 80 ft.', '1', 'Keen sight. Adv on perception checks that rely on sight. The giant eagle is a noble creature that speaks its own language and understands speech in the common tongue.'),
          ('wolf',11,13,'40ft.','1/4','Keen hearing and smell. pack tactics'),
          ('velociraptor',10, 13,'30ft.','1/4','pack tactics. This feathered dinosaur is about the size of a large turkey. It is an aggresive predator that often hunts in packs to bring down larger prey.');

    INSERT INTO stats(creature_id, strength, dex, con, intell, wis, char)
    VALUES(1, 19, 14, 12, 1, 10, 3),
          (2, 19, 13, 17, 2, 12, 5),
          (3, 15, 15, 14, 4, 12, 6),
          (4, 17, 15, 15, 3, 12, 7),
          (5, 16, 10, 12, 2, 10, 6),
          (6, 15, 18, 11, 3, 10, 3),
          (7, 16, 17, 13, 8, 14, 10),
          (8, 12, 15, 12, 3, 12, 6),
          (9, 6, 14, 13, 4, 12, 6);

    INSERT INTO images(creature_id, imageURL, alt_text)
    VALUES(1,'https://images.unsplash.com/photo-1570741066052-817c6de995c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80', 'a big snake' ),
          (2, 'https://cdn.pixabay.com/photo/2012/10/10/10/39/dinosaur-60588__340.jpg', 'allosuarus'),
          (3, 'https://images.unsplash.com/photo-1559999127-b8b7f927dab8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRpbm9zYXVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60','deinonychus' ),
          (4, 'https://images.unsplash.com/photo-1590420485404-f86d22b8abf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29sZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60','dire wolf' ),
          (5, 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWxrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60','elk'),
          (6, 'https://media.istockphoto.com/photos/focus-stacked-extreme-closeup-image-of-a-blue-dasher-dragonfly-picture-id1331458743?b=1&k=20&m=1331458743&s=170667a&w=0&h=5LV5ytwfGIQFb_M-MvcsEETfE92FSyvoUy6Be1clcLc=','giant dragonfly'),
          (7, 'https://images.unsplash.com/photo-1583316368898-c7b369c31cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhZ2xlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60','giant eagle'),
          (8, 'https://images.unsplash.com/photo-1572363420552-058bd41af8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29sZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60','wolf' ),
          (9, 'https://media.istockphoto.com/photos/velociraptor-claw-picture-id489811403?k=20&m=489811403&s=612x612&w=0&h=cm59-OqnCBhMsXf-bp5OIlN3ycQGMLOQZQUXkB_r4CI=','velociraptor foot');
 
    INSERT INTO attacks(creature_id, attack_name,to_hit, die_size,num_die,description)
    VALUES(1, 'Bite',6, 6, 2,'The giant snake bites with razor sharp teeth' ),
          (1, 'Constrict', 6, 8, 2,'The target is grappled(esc DC 16). Until this grapple ends, the creature is restrained, and the snake cant grapple another target'),
          (2, 'Bite', 6, 10, 2, 'The large dinosaur sinks it teeth into its target'),
          (2, 'Claw', 6, 8, 1, 'The target is raked by the dinosaurs claws'),
          (3, 'bite', 4, 8, 1, 'The large raptor sinks its teeth into the target'),
          (3, 'claw', 4, 8, 1, 'The target is raked by the raptors fierce talons'),
          (4, 'Bite', 5, 6, 2, 'If the target is a creature, it must succeed a dc 13 strength saving throw or be knocked prone'),
          (5, 'Ram', 5, 6, 1, 'The target is rammed by the elks horns'),
          (5, 'Hooves', 5, 4, 2, 'target must be prone' ),
          (6, 'Bite', 6, 4, 1, 'the giant dragonfly takes a bite'),
          (7, 'Beak', 5, 6, 1, 'The target is bit by the eagles beak'),
          (7, 'Talons', 5, 6, 2, 'The target is raked by the eagles talons'),
          (8, 'Bite', 4, 4, 2, 'If the target is a creature, it must succeed o a DC 11 strength saving throw or be knocked prone'),
          (9, 'Bite', 4, 6, 1, 'The small predator sinks its teeth into the target'),
          (9, 'Claws', 4, 4, 1, 'The target is raked by the raptors claws' );
         `);
  },
  //a test
  getCreature: (req, res) => {
    sequelize.query(
        `SELECT creatures.creature_id AS id, creatures.creature_name AS name, creatures.creature_hp AS hp,creatures.creature_ac, creatures.creature_speed,creatures.creature_cr,creatures.description,images.imageURL,stats.strength, stats.dex, stats.con, stats.intell, stats.wis, stats.char  FROM creatures
        Join images On creatures.creature_id = images.creature_id
        Join stats ON creatures.creature_id = stats.creature_id
       WHERE creatures.creature_id = ${req.params.id};
       `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err)); //change console to rollbar when app goes live
  },
  getAllCreatures: (req, res) => {
    sequelize.query(`
      SELECT * FROM creatures;
    `).then(dbRes => {
      res.status(200).send(dbRes[0])
    }).catch((err) => console.log(err))
  },
  getAttack: (req, res) => {
    sequelize.query(`
      SELECT creatures.creature_name AS name, attacks.attack_name, attacks.to_hit,attacks.die_size,attacks.num_die,attacks.description, stats.strength AS damage FROM creatures
      JOIN attacks ON creatures.creature_id = attacks.creature_id
      JOIN stats ON creatures.creature_id = stats.creature_id
      WHERE creatures.creature_id = ${req.params.id}
    `).then(dbRes => {
      res.status(200).send(dbRes[0])
    }).catch((err)=> console.log(err))
  },
  createCreature: (req, res) => {
    const{
      name,
      hp, 
      ac,
      speed,
      cr,
      desc,
      str,
      dex,
      con,
      int,
      wis,
      char,
      attack_name,
      to_hit,
      die_size,
      num_die,
      description,
      imageURL,
      alt_text
    } = req.body;
    sequelize.query(`
      INSERT INTO creatures(creature_name, creature_hp, creature_ac, creature_speed,creature_cr,description)
      VALUES(${name},${hp},${ac},${speed},${cr},${desc})
      RETURNING creature_id;


      INSERT INTO stats(creature_id, strength, dex, con, intell, wis, char)
      VALUES(creature_id,${str},${dex},${con},${int},${wis},${char});

      INSERT INTO images(creature_id, imageURL, alt_text)
      VALUES(creature_id,${imageURL},${alt_text});

      INSERT INTO attacks(creature_id, attack_name,to_hit, die_size,num_die,description)
      VALUES(creature_id,${attack_name},${to_hit},${die_size},${num_die},${description});
    `).then( dbRes => {
      res.status(200).send(dbRes[0])
    }).catch(err => console.log(err))
  }
};
