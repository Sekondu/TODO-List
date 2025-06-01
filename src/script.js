import "../src/style.css";
import { first_page } from "./entry_page";
import { add_anything } from "./add_Tasks";
import { project } from "./add_project.js";
import {utilities} from './utils.js';

class interface_handling
{
    constructor()
    {
        this.clicked=0;
        this.project_clicked=false;
        this.body=document.querySelector(".body");
        this.button=document.querySelector(".collapse-dashboard");
        this.home_button=document.querySelector(".today");
        this.my_projects=document.querySelector(".project");
        this.title=document.querySelector(".title");
        this.default_tasks=document.querySelector(".default");
        this.add_task=document.querySelector(".add");
        this.add_project=document.querySelector(".add_project");
        this.projects_container=document.querySelector(".projects_container");
        this.button.addEventListener("click",()=>{
            if(this.clicked%2===0)
            {
                first_page.dashboard_collapse();
                this.clicked++;
            }
            else{
                first_page.dashboard_expand();
                this.clicked++;
            }
        })
        this.add_task.addEventListener("click",()=>
        {
            add_anything.task_builder("b1","default",this.add_task.parentNode);
        })
        this.add_project.addEventListener("click",()=>
        {
            project.form_build();
        })
        this.my_projects.addEventListener("click",()=>
        {
            if(this.project_clicked===false)
            {
                 this.title.textContent="Projects";
                this.body.removeChild(this.default_tasks);
                this.project_clicked=true;
            }
        })
        this.home_button.addEventListener("click",()=>
        {
            if(this.project_clicked===true)
            {
                this.body.insertBefore(this.default_tasks,this.projects_container);
                this.title.textContent="To-Do List";
                this.project_clicked=false;
            }
        })  
    }
}
let inter=new interface_handling();
