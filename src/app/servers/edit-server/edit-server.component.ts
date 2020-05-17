import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
              private route :ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    //  console.log(this.server.id);
    this.router.navigate(['/servers',this.server.id,this.server.name],
                          {queryParams : {allowEdit : this.server.id==3?1:0 }}
                          );
  }

}
