const CourseModal = require("../models/CourseModel");
const { ResponseHandle } = require("../utils/ResponseHandle");

//------------------- Controlling the logic of the course specific -----------------X
function CourseController() {
    return {

        // Fetch all the coureses, using GET '/api/course/fetchAll'
        async FetchAll(req,res){
            try {
                
                const courses = await CourseModal.find();

                if(courses.length === 0) return res.status(200).json({success:true,msg:'At a time no course is available, please send request to add on'})

                return res.status(200).json({success:true,msg:'At a time no course is available, please send request to add on'})

            } catch (error) { return res.status(500).json({success:false,msg:error.message}) }
        }

    }
}

module.exports = CourseController;