import { Component, ViewChild,ElementRef, OnInit,Input } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { films } from './data-table-demo3-data';
import { FtinfoService } from '../ftinfo.service';
//import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'data-table-demo-3',
  templateUrl: './data-table-demo3.html',
  styleUrls: ['./data-table-demo3.css'],
  providers: [FtinfoService],
 
})


  
export class DataTableDemo3 implements OnInit {

     films = [];
    filmCount = 0;
    filmResource:any;
    projectResource:any;
    projects=[];
    projectCount = 0;
    projecttypes:any={"data":[{"_id":"58a17d0faff4ed67dbd494ec","name":"Construction / Creation of New Facilities"},{"_id":"58a17d32aff4ed67dbd494ef","name":"Renovation/Upgradation of Existing Facilities"},{"_id":"58a17d48aff4ed67dbd494f1","name":"New Equipments"},{"_id":"58a81f5bdb7d4346a9956a39","name":"Others"}],"value":true};
    assettypes:any={"data":[{"_id":"58a17ec2aff4ed67dbd49564","name":"Academic Buildings"},{"_id":"58a17ecaaff4ed67dbd49566","name":"Administrative Buildings"},{"_id":"58a17ed4aff4ed67dbd49568","name":"Auditorium"},{"_id":"58a17ee2aff4ed67dbd4956c","name":"Books/Journals/E-Resources"},{"_id":"58a17eeeaff4ed67dbd4956e","name":"Boys Hostel"},{"_id":"58a17ef6aff4ed67dbd49570","name":"Boys Toilet"},{"_id":"58a17effaff4ed67dbd49578","name":"Campus development"},{"_id":"58a17f1baff4ed67dbd4957b","name":"Campus development - Alternate Energy Sources"},{"_id":"58a17f23aff4ed67dbd4957d","name":"Campus development - Amenities"},{"_id":"58a17f31aff4ed67dbd4957f","name":"Campus development - Beautification"},{"_id":"58a17f44aff4ed67dbd49582","name":"Campus development - Drainage"},{"_id":"58a17f4faff4ed67dbd49584","name":"Campus development - Playgrounds"},{"_id":"58a17f70aff4ed67dbd49588","name":"Campus development - Water Harvesting"},{"_id":"58a17f7baff4ed67dbd4958a","name":"Campus development - Water Supply"},{"_id":"58a17f83aff4ed67dbd4958c","name":"Canteen/Cafeteria"},{"_id":"58a17f8caff4ed67dbd4958f","name":"Classrooms"},{"_id":"58a17f95aff4ed67dbd49595","name":"Common Room for Students"},{"_id":"58a17f9faff4ed67dbd49597","name":"Computer Centre"},{"_id":"58a17fa8aff4ed67dbd4959a","name":"Computers"},{"_id":"58a17fafaff4ed67dbd4959c","name":"Girls Hostel"},{"_id":"58a17fb8aff4ed67dbd4959e","name":"Girls Toilet"},{"_id":"58a17fc2aff4ed67dbd495a1","name":"Laboratory"},{"_id":"58a17fcaaff4ed67dbd495a4","name":"Library"},{"_id":"58a17fd2aff4ed67dbd495a7","name":"Sports facility"},{"_id":"58a81f8ddb7d4346a9956a3e","name":"Others"}],"value":true};
    projecttype:any;
    assettype:any;
   remarks:any;
   exp:any;
  
i:any;
 @ViewChild(DataTable) projectsTable;
    @ViewChild(DataTable) filmsTable;
   data:any;
  duedate:any;
  ft:any;
  expconst:any=0;
  expren:any=0;
  expeqp:any=0;
  totalexp:any=0;
  linkaddress:any;
  projectexpense:any;
  collegename:any;
  
     constructor(public ftinfo: FtinfoService,public elem: ElementRef) {
 


}
    ngOnInit()
 {

   var i,j,k,l;
  this.ftinfo.getlink().subscribe(res1 =>{
    this.ft=res1; 
     console.log("inside subscribe of getlink()");
     console.log(res1);





     this.ftinfo.retrievedata(this.ft).subscribe(res => 
              {
      //this.projects=res.data.json.projects;
         this.linkaddress=res.data._id;
               this.collegename=res.data.json.instituteId.name;
          for (i in res.data.json.projects) {
            this.exp=0;
            this.projectexpense=0;
          
              for(j in res.data.json.projects[i].projectExpenses)
                   { this.projectexpense=this.projectexpense+(parseInt(res.data.json.projects[i].projectExpenses[j].amount)||0);
                     for(l in res.data.json.projects[i].projectExpenses[j].institutetoVendors)
                   this.exp=this.exp+Number(res.data.json.projects[i].projectExpenses[j].institutetoVendors[l].amount);
                   }
                 this.duedate = (res.data.json.projects[i].dueDate);
              var date = new Date(this.duedate); // had to remove the colon (:) after the T in order to make it work
              var day = date.getDate();
              var monthIndex = date.getMonth();
              var year = date.getFullYear();
              this.duedate = day+"-"+(monthIndex+1)+"-"+year;
               for(k in this.projecttypes.data)

                  {    if(this.projecttypes.data[k]._id===res.data.json.projects[i].projectType)
                        {this.projecttype=this.projecttypes.data[k].name;
                         }
                  } 
               for(l in this.assettypes.data)
                 { 
                        if(this.assettypes.data[l]._id===res.data.json.projects[i].assetType)
                          {
                            this.assettype=this.assettypes.data[l].name;
                          }
                  }
                this.remarks= (res.data.json.projects[i].remarks);
                  if(this.projecttype=="Construction / Creation of New Facilities")
                        {this.expconst= this.expconst+Number(this.exp);}
                   else if(this.projecttype=="Renovation/Upgradation of Existing Facilities")
                        {this.expren=this.expren+Number(this.exp);}
                  else if(this.projecttype=="New Equipments")     
                        {this.expeqp=this.expeqp+Number(this.exp);}
                        this.totalexp =this.totalexp+this.exp;     
          this.projects.push({"valueofproject": res.data.json.projects[i].valueProject,"projecttype":this.projecttype,"assettype":this.assettype,"totalprojectexpenses":this.projectexpense
          ,"exp":this.exp, "fd":this.duedate,"remarks":this.remarks });
               }      
        
        
        this.projectResource = new DataTableResource(this.projects);
        this.projectResource.count().then(count => this.projectCount = count);
                  }); 
  });

    }
    








 reloadProjects(params) {
  console.log("inside reload projects");
     console.log(params);
  
     //console.log(this.data);

        console.log("Count of received projects"+this.projectCount);  
     console.log(this.projects);
         
        this.projectResource.query(params).then(projects => this.projects = projects);
    }


    reloadFilms(params) {
  console.log("inside reload of films");
  console.log(params);
  
     //console.log(this.data);
      
         
        this.filmResource.query(params).then(films => this.films = films);
    }


    

    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7)/1.3)*100)) + ')';
    };

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };
}
