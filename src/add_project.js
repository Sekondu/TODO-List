import { add_anything } from "./add_Tasks";
import {utilities} from "./utils.js";

class AddProjects{

    constructor()
    {
        this.add_project=document.querySelector(".add_project");
        this.projects=document.querySelector(".All_Projects");
        this.body=document.querySelector("body");
        this.tasks_set=[];
        this.loaded_set=["b1"];

    }
    form_build()
    {
        //creation
        this.form=document.createElement("form");
        this.project_input=document.createElement("input");
        this.project_label=document.createElement("label");
        this.cancel=document.createElement("button");
        this.confirm=document.createElement("button");

        //adding types, id`s and names
        this.project_input.name="project";
        this.project_input.required=true;
        this.project_input.id="project";
        this.confirm.type="submit";
        this.project_label.htmlFor="project";
        this.confirm.type="submit";
        this.cancel.type="button";

        //adding text contents
        this.project_label.textContent="Project Name";
        this.project_input.placeholder="Project Name...(e.g. Portfolio Website)";
        this.confirm.textContent="Confirm";
        this.cancel.textContent="x";

        //adding styling
        this.project_input.style="grid-area:input;background-color:#343148ff;color:#d7c49eff;";
        this.project_label.style="grid-area:label";
        this.confirm.style="grid-area:confirm;justify-self:end;background-color:#343148ff;color:#d7c49eff;width:75px;font-size:15px;";
        this.cancel.style="grid-area:cancel;justify-self:end;background-color:#343148ff;color:#d7c49eff;width:50px;font-size:20px;";

        //adding to form
        this.form.appendChild(this.cancel);
        this.form.appendChild(this.project_label);
        this.form.appendChild(this.project_input);
        this.form.appendChild(this.confirm);

        //form styling
        this.form.classList.add("project_form");

        this.projects.removeChild(this.add_project);
        this.projects.appendChild(this.form);

        this.form.addEventListener("submit",(e)=>
        {
            e.preventDefault();
            this.formdata=new FormData(this.form);
            this.name=document.createElement("h2");
            this.name.textContent=this.formdata.get("project");
            let id=Math.floor(Math.random()*10)+10;
        while(this.tasks_set.includes(id))
            {
            id=Math.floor(Math.random()*10)+10;
            }
            this.tasks_set.push(id);
            this.create_Project(id,this.name.textContent);
            this.projects.removeChild(this.form);
        })
        this.cancel.addEventListener("click",()=>
        {
            this.projects.removeChild(this.form);
            this.projects.appendChild(this.add_project);
        })
        
    }
create_Project(id,project_name)
{


    let projects=JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({id: id, name: project_name});
    localStorage.setItem("projects", JSON.stringify(projects));

    let add_button = document.createElement("button");
    let delete_button = document.createElement("button");
    delete_button.textContent = "Remove Project";
    let project_name_elem = document.createElement("h3");
    project_name_elem.style = "font-size:20px;";
    project_name_elem.textContent = `Project: ${project_name} id: b${id}`;
    add_button.classList.add("add");
    let project_container = document.createElement("div");
    let project_data = document.createElement("div");
    project_data.appendChild(project_name_elem);
    project_data.appendChild(delete_button);
    project_container.appendChild(project_data);
    project_container.appendChild(add_button);
    project_container.id = `b${id}`;
    this.projects.appendChild(project_container);
    this.projects.appendChild(this.add_project);

    // styling container
    project_container.classList.add("project_container");
    project_data.classList.add("project_data");

    // styling and text Content
    add_button.textContent = "Add Task +";
    add_button.style = "opacity:0.6;font-size: 20px;border:1px solid grey;border-radius:10px;align-self:start;";
    delete_button.style = "opacity:0.6;font-size: 20px;border:1px solid grey;border-radius:10px;";

    add_button.addEventListener("click", () => {
        add_anything.task_builder(`b${id}`,project_name,add_button.parentNode);
    });
    delete_button.addEventListener("click", () => {
        this.delete_project(id,project_container);
    });
}
    delete_project(id,project_container)
    {
        //declaring the form
        this.delete_form=document.createElement("form");
        this.message=document.createElement("h3");
        this.cancel_delete=document.createElement("button");
        this.accept_delete=document.createElement("button");
        this.cancel2_delete=document.createElement("button");

        //adding types, ids and text Contents
        this.message.textContent="Are you sure you want to delete this Project?";
        this.accept_delete.type="submit";
        this.accept_delete.textContent="Yes";
        this.cancel_delete.textContent="x";
        this.cancel_delete.type="button";
        this.cancel2_delete.type="button";
        this.cancel2_delete.textContent="No";
        this.delete_form.classList.add("delete_task_form");

        //adding grid-areas for everything
        this.message.style="grid-area:message";
        this.cancel2_delete.style="grid-area:cancel2;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff";
        this.cancel_delete.style="grid-area:cancel;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff;align-self:Start;";
        this.accept_delete.style="grid-area:accept;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff";
        
        let proj=document.querySelector(`b${id}`);
        let projects=JSON.parse(localStorage.getItem("projects")) || [];
        projects=projects.filter(project => project.id !== id);
        localStorage.setItem("projects", JSON.stringify(projects));

        
        //appending everything to the form
        this.delete_form.appendChild(this.cancel_delete);
        this.delete_form.appendChild(this.message);
        this.delete_form.appendChild(this.accept_delete);
        this.delete_form.appendChild(this.cancel2_delete);

        //adding form to body
        this.body.appendChild(this.delete_form);

        this.delete_form.addEventListener("submit",(e)=>
        {
            e.preventDefault();
            while(project_container.firstChild)
            {
                project_container.removeChild(project_container.firstChild);
            }
            project_container.remove();
            this.body.removeChild(this.delete_form);
        })
    }
    loadProjects()
    {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        let all_projects=document.querySelector(".All_Projects");

        projects.forEach(project =>
        {
            if(!this.loaded_set.includes(project.id) && project.id!=="b1" && project.name!=="Default")
            {
                console.log(project.id);
                this.loaded_set.push(project.id);
                if(project.id!=="b1" && project.name!=="Default")
                {
                    this.create_Project(project.id,project.name);
                }
                let pro=document.querySelector(`#b${project.id}`);

                    utilities.loadtasksFromLocalStorage(pro);
            }
        }
        )
        
    }
    
}
let project=new AddProjects();
project.loadProjects();
export {project};