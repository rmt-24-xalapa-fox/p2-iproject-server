const { Run, RunItem, Item } = require("../models")

class ControllerStats {
  static async getStats(req, res, next){
    try {
      
    } catch (error) {
      next(error)
    }
  }

  static async getLeaderboard(req, res, next){
    try {
      
    } catch (error) {
      next(error)
    }
  }

  static async getUserRun(req, res, next){
    try {
      const UserId = req.user.id

      const prevrun = await Run.findOne({
        where: { UserId , finalized:false },
        order: [["updatedAt", "Desc"]],
        include:[
          {
            model: Item,
            through: RunItem
          }
        ]
      })

      // const prevrunitems = await RunItem.findAll({
      //   where:{ RunId: prevrun.id},
      //   include:[
      //     {
      //       model:Item
      //     }
      //   ]
      // })

      console.log(prevrun);

    } catch (error) {
      next(error)
    }
  }

  static async saveUserRun(req, res, next){
    try {
      const UserId = req.user.id

      const { newrun, rounds, hp, level, money, transforms, map, inventory } = req.body

      // find last run first
      const prevrun = await Run.findOne({
        attributes: ["id"],
        where: { UserId , finalized:false },
        order: [["updatedAt", "Desc"]],
      })
      
      if(prevrun && newrun){
        // finalized old run first if not finalzied
        if(!prevrun.finalized){
          await Run.upsert({ id:prevrun.id, finalized:true })
        }
      }

      // if update old run
      if(!newrun && prevrun){
        await Run.upsert({ id:prevrun.id, UserId, rounds, hp, level, money, transforms, map, })

        // update stock item
        for (const key of inventory) {
          inventory[key].forEach( async (i) => {
            // create if not found
            const [olditem, created] = await RunItem.findOrCreate({
              where: { RunId:prevrun.id , ItemId:i.id },
              defaults: {
                stock: i.stock
              }
            });

            if(!created) await RunItem.upsert({ id:olditem.id, stock: i.stock })

          });
        }
      }

      if(newrun){
        // create new run
        const thenewrun = await Run.create({
          UserId, rounds, hp, level, money, transforms, map, 
        })

        for (const key of inventory) {
          inventory[key].forEach( async (i) => {
            const thenewrunitem = await RunItem.create({
              RunId:thenewrun.id, ItemId:i.id, stock:i.stock
            })
          });
        }
      }

      res.status(201).json({ msg: "Run has been saved" })

    } catch (error) {
      next(error)
    }
  }

  static async finaliseUserRun(req, res, next){
    try {
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerStats