

class entry_page
{
    constructor()
    {
        this.main_container=document.querySelector(".main_container");
        this.dashboard=document.querySelector(".dashboard");
        this.dashboard_header=document.querySelector(".dashboard-header");
        this.header_btn=this.dashboard_header.querySelector(".btn");
        this.dashboard_buttons=document.querySelector(".dashboard-buttons");
    }
    dashboard_collapse()
    {
        this.main_container.classList.remove("dashboard_expand");
        this.main_container.classList.add("dashboard_collapse");
        this.dashboard_header.classList.add("collapsed");
        this.header_btn.textContent="▶️";
        this.dashboard.removeChild(this.dashboard_buttons);
    }
    dashboard_expand()
    {
        this.main_container.classList.remove("dashboard_collapse");
        this.dashboard_header.classList.remove("collapsed");
        this.header_btn.textContent="◀️";
        this.dashboard.appendChild(this.dashboard_buttons);
    }

}
let first_page=new entry_page();
export {first_page};