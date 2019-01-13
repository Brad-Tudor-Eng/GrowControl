import path from 'path'

// controller for / route
export const  homeRoute = async (req,res) => {
    res.sendFile(path.join(__dirname, "dist", 'index.html'))
}

