//----------Here we initializing the types of the attributes used in creating the modal

//-------------- Set the categories of courses, can only added
const CoursesCategories = Object.freeze({
    WEBDEVELOPMENT:'web development',
    BACKEND: 'backend',
    FRONTEND: 'frontend',
    APPDEVELOPMENT: 'app development',
    MACHINELEARNING: 'machine learning',
    ARTIFICIALINTELLIGENCE: 'artificial intelligence'
});

//-------------- Set the days to refund, if user cancel in between 7 days
const RefundDays = 7*24*60*60*1000; //7 Days

module.exports = {CoursesCategories,RefundDays}