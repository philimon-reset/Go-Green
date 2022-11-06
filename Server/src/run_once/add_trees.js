// run this only once to populate the database
const axios = require('axios');
const prisma = require("../Storageengine/initPrisma")


// const getProjectData = async () => {
//     const instance = axios.create({
//         baseURL: "https://tree-nation.com/api/projects?status=active",
//         headers: {'Content-Type' : 'application/json'},
//     });
//     let result = await instance.get().then(result => result.data);
//     return result;
// }

const getTreeData = async (id) => {
    const instance = axios.create({
        baseURL: `https://tree-nation.com/api/species/${id}`,
        headers: {'Content-Type' : 'application/json'},
    });
    let result = await instance.get().then(result => result.data);
    return result;
}

const func = async () => {
    // let ans = await getProjectData();
    x = 1
    while (x < 100) {
        
        try {
            let tree = await getTreeData(x)
			await prisma.tree.create({
                data: {
                    name: tree.name,
                    price: tree.price,
                    pic: tree.image,
                    description: tree.particularities.substring(0,100)
                },
            })
            
		} catch (e) {
			console.log("specie with this id doesn't exist" + x);
		}
        x = x + 1;

     }
        
}
func();

