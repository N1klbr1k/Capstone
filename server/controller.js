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
                  ('Allosaurus', 51, 13, '60 ft.', '2', 'Pounce: if it moves at least 30 feet straight toward a creature and then hits it with a claw attack, target must make a DC 13 Strength saving throw or be knocked prone, it can then make one bite attack as a bonus action.),
                  ('Deinonychus', 26,13,'40 ft.', '1','Pounce: if it moves at least 20 feet straight toward a creature and then hits it with a claw attack, target must make a DC 12 Strength saving throw or be knocked prone, it can then make one bite attack as a bonus action.),' ),
                  ('Dire Wolf', 37, 14, '50 ft.', '1','Adv on perception that relies on smell. Pack Tactics: Advantage on an attack roll if at least one ally within five feet.'),
                  ('Elk', 13, 10, '50 ft.', '1/4', 'Charge. If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7(2d6) damage. If the target is a creature, it must succeed on a dc 13 strength saving throw or be knocked prone.'),
                  ('Giant Dragonfly', 22, 16, '10 ft., fly 60 ft.', '1/2', 'Drone. When it beats it wings, the dragonfly emits a load droning sound that can be heard out to a range of 120 feet. reaction: uncanny dodge.'),
                  ('Giant Eagle', 26, 13, '10 ft. fly 80 ft.', '1', 'Keen sight. Adv on perception checks that rely on sight. The giant eagle is a noble creature that speaks its own language and understands speech in the common tongue.'),
                  (')
         `);
  },
  getCreature: (req, res) => {
    sequelize
      .query(
        `
       SELECT * FROM CREATURES
       WHERE creature_id = ${req.params.id};
       `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err)); //change console to rollbar when app goes live
  },
};
