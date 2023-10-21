
const productDetailsFromCSV = async (req, res) => {

    try {
        res.status(200).send({
            status : true
        })
    } catch(error) {
        res.status(500).send({
            status : false
        })``
    }

}

export {
    productDetailsFromCSV
}