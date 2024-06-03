

import React from 'react';

import { VerticalTab, VerticalTabs } from './VerticalTabs';
import { PlaneDetails } from './PlaneDetails';
import { EmployeeDetails } from './EmployeeDetails';
import { OwnerDetails } from './OwnerDetails';
import { ApronDetails } from './ApronDetails';
import { ModelsData } from './ModelsData';
import { AirplaneSearch } from './AirplaneSearch';
import {OwnerSearch} from './OwnerSearch';
import { ModelSearch } from './ModelSearch';
import { EmployeeSearch } from './EmployeeSearch';
import { ApronSearch } from './ApronSearch';
const Details = ({showContent,res}) => {
    if (showContent) {
    return (
        <VerticalTabs>
          <VerticalTab label="Airplane">
              <div>
                
                <AirplaneSearch res={res}></AirplaneSearch>
              </div>
            </VerticalTab>
            <VerticalTab label="Owner">
              <div>
                <OwnerSearch res={res}></OwnerSearch>
              </div>
            </VerticalTab>
            <VerticalTab label="Models">
              <div>
                <ModelSearch res={res}></ModelSearch>
              </div>
            </VerticalTab>
            <VerticalTab label="Employees/staff">
              <div>
                <EmployeeSearch res={res}></EmployeeSearch>
              </div>
            </VerticalTab>
            <VerticalTab label="Apron">
              <div>
              <ApronSearch res={res}></ApronSearch>
              </div>
            </VerticalTab>
           
          </VerticalTabs>
    );  
    }else{
        return(
        <VerticalTabs>
        <VerticalTab label="Aprons">
          <div>
            <ApronDetails></ApronDetails>
          </div>
        </VerticalTab>
        <VerticalTab label="Plane Services">
          <div>
            <ModelsData></ModelsData>
          </div>
        </VerticalTab>
        <VerticalTab label="Models">
          <div>
            <PlaneDetails></PlaneDetails>
          </div>
        </VerticalTab>
        <VerticalTab label="Owners">
          <div>
            <OwnerDetails></OwnerDetails>
          </div>
        </VerticalTab>
        <VerticalTab label="Employees">
          <div>
            <EmployeeDetails></EmployeeDetails>
          </div>
        </VerticalTab>
      </VerticalTabs>
        ); 
        
        }
};

export { Details };
