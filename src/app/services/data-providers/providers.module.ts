import { NgModule } from '@angular/core';
import { DatabaseAccessProvider } from '../storage/database-access.provider';
import { DatabaseEntityProvider } from '../storage/database-entity.provider';
import { MessageApiProvider, MessageDbProvider } from './message.provider';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [],
  exports: [],
  providers:[MessageDbProvider, MessageApiProvider, DatabaseAccessProvider]
})
export class ProvidersModule { }
