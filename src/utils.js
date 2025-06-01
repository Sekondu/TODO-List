import {add_anything} from "./add_Tasks.js";


class util
{
    constructor()
    {
    this.loaded=[];
    this.default_loaded=[];
    }
    loadtasksFromLocalStorage(pro) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let pro_name=document.querySelector(".project_data>h3");

     tasks.forEach(task => {
        if(this.loaded.includes(task.task_id) || task.id !== pro.id)
        {
            return;
        }
        this.loaded.push(task.task_id);
            let task_name=document.createElement("p");
            let task_date=document.createElement("p");
            let description=document.createElement("p");
            let description_container=document.createElement("div");
            description.textContent = task.description;
            description_container.appendChild(description);
            task_name.textContent = task.task_name;
            task_date.textContent = task.task_date;
            console.log(task.id);
        add_anything.create_Task(pro.id,pro_name.textContent,description,description_container,task.priority,task_name,task_date,task.task_id);
      
    })
    
}
    loadDefaultProject()
    {
        let default_project=JSON.parse(localStorage.getItem("default_project")) || [];
        if(default_project.length===0)
        {
            return;
        }
        default_project.forEach(task => {
            if(this.default_loaded.includes(task.task_id))
            {
                return;
            }
            this.default_loaded.push(task.task_id);
        let task_name=document.createElement("p");
            let task_date=document.createElement("p");
            let description=document.createElement("p");
            let description_container=document.createElement("div");
            description.textContent = task.description;
            description_container.appendChild(description);
            task_name.textContent = task.task_name;
            task_date.textContent = task.task_date;
            console.log(task.task_id);
            add_anything.create_Task("b1","default",description,description_container,task.priority,task_name,task_date,task.task_id);
        })
        
    }
}
let utilities=new util();
utilities.loadDefaultProject();
export {utilities}; 