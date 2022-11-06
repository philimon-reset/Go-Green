// run this only once to populate the database
var json = require('./de.json'); //(with path)
const axios = require('axios');
const prisma = require("../Storageengine/initPrisma")

// const getTreeData = async () => {
//     const instance = axios.create({
//         baseURL: "https://tree-nation.com/api/projects?status=active",
//         headers: {'Content-Type' : 'application/json'},

//     });

//     let result = await instance.get().then(result => result.data);
//     return result;
// }


const func = async (json) => {
    
    for (let x in json) {
        try {
			await prisma.city.create({
                data: {
                    name: json[x].city,
                    Country: json[x].country,
                },
            })
            
		} catch (e) {
			console.log("errot while adding city api data", e);
            break;
		}
     }    
}

func(json);

