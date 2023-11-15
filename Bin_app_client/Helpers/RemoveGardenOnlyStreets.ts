const removeGardenOnlyStreets = (allStreets: {}) => {

    const streets = Object.keys(allStreets)

    //value = {calendar: 1, calendar: 2}

    for( const [key, value] of Object.entries(allStreets)) {

        let count = 0;
        for(const [key1,value1] of Object.entries(value)){
            //key1 == food_id etc
            count +=1
        }
        
        if(count ===1){
            delete allStreets[key]
        }

    }

    return allStreets
}

export default removeGardenOnlyStreets