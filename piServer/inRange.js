const inRange = (value, {average, tol}) =>{
    //compare value to a range and determine if it's in bounds
    //return true if in range return false if out of range
	

    return  value >= average - tol
}

module.exports = {
    inRange
}