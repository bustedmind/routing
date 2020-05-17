import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service'


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    let serverID = Number( this.route.snapshot.params['id']);
    this.server = this.serversService.getServer(serverID);

    this.route.params.subscribe(
      (param : Params)=>{
        serverID = param['id'];
        this.server = this.serversService.getServer(+serverID);
        console.log("route edit - "+this.allowEdit);

      }
    );

    this.route.queryParams.subscribe(
      (queryParam : Params)=>{
        this.allowEdit = +queryParam['allowEdit']===1?true:false;
        console.log("cur edit - "+this.allowEdit+" -"+queryParam['allowEdit']);
      }
    )


  }
  editServer(){
    this.router.navigate(['edit', ],{relativeTo:this.route});
  }

}
