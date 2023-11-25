import express from "express"
import { MongoClient } from "mongodb"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const { MONGODB_API_KEY } = process.env

if (!MONGODB_API_KEY) {
  console.error("Missing MONGODB_API_KEY in the environment variables.")
  process.exit(1)
}

const uri = `mongodb+srv://bibartaks:${MONGODB_API_KEY}@formify.efjmlkb.mongodb.net/`
const client = new MongoClient(uri)

// Routes
app.get("/user/", async (req, res) => {
  let connection
  try {
    connection = await client.connect()

    const database = client.db("formify")
    const sectors = database.collection("users_data")
    const query = {}
    const result = await sectors.findOne(query)

    console.log(result)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  } finally {
    if (connection) {
      connection.close()
    }
  }
})

app.get("/", async (req, res) => {
  let connection
  try {
    connection = await client.connect()

    const database = client.db("formify")
    const sectorsCollection = database.collection("sectors")
    const subSectorsCollection = database.collection("sub_sector")
    const subSectorItemsCollection = database.collection("sub_sector_items")

    const result = await sectorsCollection
      .aggregate([
        {
          $lookup: {
            from: "sub_sector",
            localField: "id",
            foreignField: "sector_id",
            as: "subSectors",
          },
        },
        {
          $unwind: "$subSectors",
        },
        {
          $lookup: {
            from: "sub_sector_items",
            localField: "subSectors.id",
            foreignField: "subsector_id",
            as: "subSectors.subSectorItems",
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            id: { $first: "$id" },
            subSectors: { $push: "$subSectors" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            id: 1,
            subSectors: {
              $map: {
                input: "$subSectors",
                as: "subSector",
                in: {
                  _id: "$$subSector._id",
                  name: "$$subSector.name",
                  id: "$$subSector.id",
                  sector_id: "$$subSector.sector_id",
                  subSectorItems: {
                    $ifNull: ["$$subSector.subSectorItems", []],
                  },
                },
              },
            },
          },
        },
        {
          $sort: {
            name: 1, // Sort by the "name" field in ascending order
          },
        },
      ])
      .toArray()

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  } finally {
    if (connection) {
      connection.close()
    }
  }
})

app.put("/post/", async (req, res) => {
  let connection
  try {
    connection = await client.connect()

    const database = client.db("formify")
    const sectors = database.collection("users_data")

    const { name, sector, agree } = req.body

    if (!name || !sector || !agree) {
      return res.status(400).send("Name, sector, and agree are required")
    }

    const filter = { _id: "656087b11c144c567acb853b" }
    const updateDoc = {
      $set: {
        name,
        sector: Array.isArray(sector) ? sector : [sector],
        agree,
      },
    }

    const result = await sectors.updateOne(filter, updateDoc, { upsert: true })

    res.send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  } finally {
    if (connection) {
      connection.close()
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
