import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FtinfoService {

  constructor(public http: Http) { }

results:any;
ft:any;
public getlink():any
{
  
return(this.http.get("http://misrusachd.in/usersc/fundtrackersummary/fundlink.php"))
.map(res=>res.json());
  

}

public getlinkwithid(id:any):any
{
 let params: URLSearchParams = new URLSearchParams();
 params.set('uid', id); 
return(this.http.get("http://misrusachd.in/usersc/fundtrackersummary/fundlink.php",params))
.map(res=>res.json());
  

}

public retrievedata(ft:any) : any
{   console.log("inside retrievedata");
var body = {"_id":ft}; 
return(this.http.post("https://rusamhrd.tiss.edu/api/Form/getOne",body)).map(res => res.json()); 
}
public retrieveassettype() : any
{   const body = {"_id":"591b422e64cb95337dc36d59"}; 
return(this.http.post("https://rusamhrd.tiss.edu/api/AssetType/findAllAssetType",null)).map(res => res.json());
 }

  public retrieveprojecttype() : any
  {   const body = {"_id":"591b422e64cb95337dc36d59"}; 
return(this.http.post("https://rusamhrd.tiss.edu/api/ProjectType/findAllProjectType",null)).map(res => res.json());
 }

}