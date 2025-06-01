class add_tasks_projects
{
    constructor()
    {
         this.add_Task_default;
         this.body=document.querySelector("body");
        this.default_project;
        this.projects=[];
        this.tasks_set=[];
    }
    set_Default_Project(parent)
    {
        this.default_project=parent;
    }
    task_builder(project_id,project_name,parent){
        this.add_Task_default=parent.querySelector(".add");
        this.set_Default_Project(parent);
        this.default_project.removeChild(this.add_Task_default);
        //creating the form
        this.form=document.createElement("form");
        this.form_submit=document.createElement("button");
        this.priority_label=document.createElement("label");
        this.form_priority=document.createElement("select");
        this.form_low_prio=document.createElement("option");
        this.form_medium_prio=document.createElement("option");
        this.form_high_prio=document.createElement("option");
        this.form_date_input=document.createElement("input");
        this.form_date_label=document.createElement("label");
        this.name_input=document.createElement("input");
        this.name_label=document.createElement("label");
        this.desc_label=document.createElement("label");
        this.desc_input=document.createElement("input");
        this.form_cancel=document.createElement("button");
        let description_container=document.createElement("div");

        //adding styling
        this.form_cancel.style="grid-area:cancel;color:#d7c49eff;justify-self:end;margin-right:20px;width:50px;aspect-ratio:1;background-color:transparent;border:none;font-size:20px;";
        this.form_submit.style="grid-area:submit;color:#d7c49eff;justify-self:end;margin-right:20px;background-color:transparent;border:none;align-self:center;font-size:20px;padding-bottom:10px;";
        this.name_input.style="color:#d7c49eff;background-color:transparent;border-radius:5px;grid-area:name;font-size:15px;height:25px;";
        this.name_label.style="grid-area:name_label;align-self:end;font-size:20px;height:30px;";
        this.form_date_input.style="grid-area:date;background-color:transparent;color:#d7c49eff;font-size:15px;height:25px;border-radius:5px;";
        this.form_date_label.style="grid-area:date_label;align-self:end;font-size:20px;";
        this.desc_input.style="grid-area:desc;background-color:transparent;color:#d7c49eff;font-size:15px;height:25px;border-radius:5px";
        this.desc_label.style="grid-area:desc_label;font-size:20px;";
        this.form_priority.style="background-color:transparent;grid-area:priority;color:#d7c49eff";
        this.priority_label.style="grid-area:priority_label;background-color:transparent;color:#d7c49eff;font-size:20px;align-self:end;";

        //setting up types and id`s
        this.form_submit.type="submit";
        this.form_date_input.id="date";
        this.desc_input.name="desc";
        this.desc_input.id="desc";
        this.desc_input.value="No Description for this Task";
        this.desc_label.htmlFor="desc";
        this.name_input.id="name";
        this.name_input.name="name";
        this.name_label.htmlFor="name";
        this.form_date_input.name="date";
        this.form_date_input.type="date";
        this.form_date_label.htmlFor="date";
        this.form_priority.name="priority";
        this.form_priority.id="priority";
        this.priority_label.htmlFor="priority";
        this.form_low_prio.value="low";
        this.form_medium_prio.value="medium";
        this.form_high_prio.value="high";
        this.form_low_prio.selected=true;
        this.name_input.required=true;
        this.form_date_input.required=true;
        
        //setting up inner text contents
        this.form_cancel.textContent="X";
        this.form_date_label.textContent="Due-Date";
        this.form_submit.textContent="Confirm";
        this.name_label.textContent="Task Name";
        this.name_input.placeholder="Task Name (e.g. Wake up at 9am)";
        this.desc_label.textContent="Description/Note";
        this.desc_input.placeholder="Description";
        this.priority_label.textContent="Priority";
        this.form_low_prio.textContent="Low";
        this.form_medium_prio.textContent="medium";
        this.form_high_prio.textContent="high";
        
        //styling class for form
        this.form.classList.add("form-style");

        //appending everything to the form
        this.form.appendChild(this.form_cancel);
        this.form.appendChild(this.name_label);
        this.form.appendChild(this.name_input);
        this.form.appendChild(this.form_date_label);
        this.form.appendChild(this.form_date_input);
        this.form.appendChild(this.desc_input);
        this.form.appendChild(this.desc_label);
        this.form.appendChild(this.priority_label);
        this.form_priority.appendChild(this.form_low_prio);
        this.form_priority.appendChild(this.form_medium_prio);
        this.form_priority.appendChild(this.form_high_prio);
        this.form.appendChild(this.form_priority);
        this.form.appendChild(this.form_submit);

        //adding cancelation feature
        this.form_cancel.addEventListener("click",()=>
        {
            this.default_project.removeChild(this.form);
            this.default_project.appendChild(this.add_Task_default);
        })

        //adding event listener to form submission
        this.form.addEventListener("submit",(event)=>
        {
            event.preventDefault();
            this.formdata=new FormData(this.form);
            this.task_name=document.createElement("p");
            this.task_date=document.createElement("p");
            let description=document.createElement("p");
            this.task_name.textContent=this.formdata.get("name");
            this.date=this.formdata.get("date");
            let date=new Date(this.date);
            this.task_date.textContent=`Due Date: ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
            this.priority=this.formdata.get("priority");
            description.textContent=this.formdata.get("desc");
            this.default_project.removeChild(this.form);
             let task_id=Math.floor(Math.random()*100)+50;
            while(this.tasks_set.includes(task_id))
            {
                task_id=Math.floor(Math.random()*100)+50;
            }
            this.create_Task(project_id,project_name,description,description_container,this.priority,this.task_name,this.task_date,task_id);
            this.default_project.appendChild(this.add_Task_default);
            
        })
        this.default_project.appendChild(this.form);
    }
    create_Task(project_id,project_name,descriptio,description_container,priority,task_nam,task_dat,task_id)
    {
        let task_name=document.createElement("p");
        let task_date=document.createElement("p");
        let description=document.createElement("p");
        description=descriptio;
        task_name.textContent=task_nam.textContent;
        task_date.textContent=task_dat.textContent;
            this.default_project=document.querySelector(`#${project_id}`);
            console.log(this.default_project);
        let task_container=document.createElement("div");
        let details=document.createElement("button");
        //details button styling
        details.style="background-color:transparent;color:#d7c49eff;font-size:16px;border:none;";
        details.textContent="Details ▼";
        //description container and its content styling
        description_container.style="display:flex;justify-content:space-between;width:90%;";
        this.delete_task=document.createElement("button");
        this.delete_task.textContent="Delete";
        this.delete_task.type="button";
        this.delete_task.style="align-self:center;width:80px;font-size:15px;color:#d7c49eff;background-color:#343148ff;";


        let checkbox=document.createElement("input");
        let done_container=document.createElement("div");
        checkbox.type="checkbox";
        let checkbox_label=document.createElement("label");
        checkbox_label.textContent="Done";
        checkbox.id=`c${project_id}`;
        checkbox.name="checkbox";
        checkbox_label.htmlFor=checkbox.id;
        done_container.style="align-text:center;align-self:center;";
        task_container.classList.add("task-container");

        //deciding priority color
        if(priority==="low")
            {
                task_container.classList.add("low");
            }
            else if(priority==="medium")
            {
                task_container.classList.add("medium");
            }
            else if(priority==="high")
            {
                task_container.classList.add("high");
            }
        done_container.appendChild(checkbox_label);
        done_container.appendChild(checkbox);
        description_container.appendChild(description);
        description_container.appendChild(this.delete_task);
        task_container.appendChild(task_name);
        task_container.appendChild(task_date);
        task_container.appendChild(done_container);
        task_container.appendChild(details);
            
                if(project_id=="b1")
            {
                let default_task={
                    task_id:"b1",
                    project_name:"default",
                    description:description.textContent,
                    task_name:task_name.textContent,
                    task_date:task_date.textContent,
                    priority:priority,
                    task_id:task_id,
                }
                let default_project=JSON.parse(localStorage.getItem("default_project")) || [];
                default_project.push(default_task);
                localStorage.setItem("default_project",JSON.stringify(default_project));
                this.default_project=document.querySelector(".default");
            }
               if(!this.tasks_set.includes(task_id) && project_id!=="b1")
               {
                 this.tasks_set.push(task_id);
                let task={task_id:task_id,
                id:`${project_id}`,
                project_name:project_name,
                description:description.textContent,
                task_name:task_name.textContent,
                task_date:task_date.textContent,
                priority:priority,
                }
            let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.push(task);
             localStorage.setItem("tasks",JSON.stringify(tasks));
               }

                this.default_project.insertBefore(task_container,this.default_project.querySelector(".add"));
        //drop down for the details section
        details.addEventListener("click",()=>
        {
            task_container.classList.toggle("task_details");
            if(task_container.classList.contains("task_details"))
            {
                task_container.parentNode.insertBefore(description_container,task_container.nextSibling);
            }
            else{
                task_container.parentNode.removeChild(description_container);
            }
        })
        this.delete_task.addEventListener("click",()=>
        {
            this.delete_Task(task_id,task_container,description_container);
        })
    }
    delete_Task(id,task_container,description_container)
    {
        //declaring the form
        let delete_form=document.createElement("form");
        let message=document.createElement("h3");
        let cancel_delete=document.createElement("button");
        let accept_delete=document.createElement("button");
        let cancel2_delete=document.createElement("button");

        //adding types, ids and text Contents
        message.textContent="Are you sure you want to delete this task?";
        accept_delete.type="submit";
        accept_delete.textContent="Yes";
        cancel_delete.textContent="x";
        cancel_delete.type="button";
        cancel2_delete.type="button";
        cancel2_delete.textContent="No";
        delete_form.classList.add("delete_task_form");

        //adding grid-areas for everything
        message.style="grid-area:message";
        cancel2_delete.style="grid-area:cancel2;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff";
        cancel_delete.style="grid-area:cancel;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff;align-self:Start;";
        accept_delete.style="grid-area:accept;align-self:center;background-color:transparent;font-size:20px;color:#d7c49eff";
        

        //appending everything to the form
        delete_form.appendChild(cancel_delete);
        delete_form.appendChild(message);
        delete_form.appendChild(accept_delete);
        delete_form.appendChild(cancel2_delete);

        //adding form to body
        this.body.appendChild(delete_form);

        //disabling all of the buttons on screen
        this.all_buttons=document.querySelectorAll("button");
        this.delete_form_buttons=[cancel2_delete,cancel_delete,accept_delete];
        this.included_buttons=Array.from(this.all_buttons).filter(button =>
        {
            return !this.delete_form_buttons.includes(button);
        }
        )
        for(let button of this.included_buttons)
        {
            button.disabled=true;
        }

        //if user really deleted that task
        delete_form.addEventListener("submit",(e)=>
        {
            e.preventDefault();
          
            let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
            tasks=tasks.filter(task => task.task_id !== id);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            if (task_container.parentNode) {
            task_container.parentNode.removeChild(task_container);
            }
            if (description_container.parentNode) {
                description_container.parentNode.removeChild(description_container);
            }
                let default_project=JSON.parse(localStorage.getItem("default_project")) || [];
                default_project=default_project.filter(task => task.task_id !== id);
                localStorage.setItem("default_project", JSON.stringify(default_project));

            this.body.removeChild(delete_form);
            for(let button of this.included_buttons)
            {
            button.disabled=false;
            }
        })
        this.cancel_buttons=[cancel2_delete,cancel_delete];
        this.cancel_buttons.forEach(button =>
        {
            button.addEventListener("click",()=>
            {
                this.body.removeChild(delete_form);
                for(let button of this.included_buttons)
                {
                    button.disabled=false;
                }
            })
        }
        )
    }
    
}
let add_anything=new add_tasks_projects();
export {add_anything};