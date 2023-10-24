//---------------- Here we create the global functions are which are used in distinct way----X

//------------------ Server api configurations variable
export const SERVER = process.env.REACT_APP_SERVER_API;

//------------- Set the categories of the keywords, to show
export const CoursesCategories = ['web development', 'backend', 'frontend', 'app development', 'machine learning', 'artificial intelligence'];

//--------- Define the type of avatar images
export const AvatarTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'];

//--------------- Tokenization using the localStorage functions
export const DayToValidate = 7*24*60*60*1000; //Validate token upto 7 day

export const setWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    // 1 day = 24*60*60*1000;
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

//------------------ Function to get the data of localstorage -----------X
export const getWithExpiry = (key) => {

    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

// AUTHENTICATION SPECIFIC STUFF-------------- For use this stuff in authentications users and datas
export const Token = getWithExpiry('token'); //Get the token value to validating users
