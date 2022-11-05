// run this only once to populate the database
const axios = require('axios');
const prisma = require("../Storageengine/initPrisma")


const getTreeData = async () => {
    const instance = axios.create({
        baseURL: "https://tree-nation.com/api/projects?status=active",
        headers: {'Content-Type' : 'application/json'},

    });

    let result = await instance.get().then(result => result.data);
    return result;
}

const func = async () => {
    let ans = await getTreeData();
    for (let x in ans) {
        try {
			await prisma.tree.create({
                data: {
                    name: ans[x].name,
                    price: ans[x].species_price_from,
                    pic: ans[x].url,
                    description: ans[x].description.substring(0,100)
                },
            })
            
		} catch (e) {
			console.log("errot while adding tree api data", e);
            break;
		}

     }
        
}
func();

