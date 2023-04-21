import "./App.scss";
import React from 'react';

import {
  AbstractWidgetProps,
  StagePanelLocation,
  StagePanelSection,
  UiItemsProvider,
} from '@itwin/appui-abstract';
import {
  Angle,
  Point3d, Vector3d
} from "@itwin/core-geometry";
import { IModelApp } from "@itwin/core-frontend";
import { InputLabel } from "@itwin/core-react";

const savedRooms = [
  {
    name: "Reception",
    eye: Point3d.create(12.407497241246414,5.702534622919199,4.6205268411337475),
    target: Point3d.create(15.143793314168796,7.31083791688283,3.950597154098331)
  },
  {
    name: "Room 1001",
    eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
    target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
  },
  {
    name: "Room 1002",
    eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
    target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
  },
  {
    name: "Room 1003",
    eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
    target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
  },
  {
    name: "Room 1004",
    eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
    target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
  },
  {
    name: "Room 2101",
    eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
    target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
  },
  {
    name: "Room 2102",
    eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
    target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
  },
  {
    name: "Room 2103",
    eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
    target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
  },
  {
    name: "Room 2304",
    eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
    target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
  },
  {
    name: "Room 3051",
    eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
    target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
  },
  {
    name: "Room 3052",
    eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
    target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
  },
  {
    name: "Room 3013",
    eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
    target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
  },
  {
    name: "Room 3074",
    eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
    target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
  },

  {
    name: "Stairs LVL 1",
    eye: Point3d.create(39.603617263623995,14.311866512060128,11.781061637936398),
    target: Point3d.create(36.61274040026802,13.413217881549125,11.918157154431693)
  },
  {
    name: "Stairs LVL 2",
    eye: Point3d.create(10.275063387681657,14.844116289829307,19.578595217336233),
    target: Point3d.create(14.886480339355856,13.522076278222215,18.893256670720188)
  },
  {
    name: "Stairs LVL 3",
    eye: Point3d.create(39.603617263623995,14.311866512060128,11.781061637936398),
    target: Point3d.create(36.61274040026802,13.413217881549125,11.918157154431693)
  }
]

function AddNewRoomToDataBase(name:string){
  const firstVP = IModelApp.viewManager.getFirstOpenView();
  if (firstVP && firstVP.view.isSpatialView()) {
    const newRoom={
      name: name,
      eye: firstVP.view.getEyePoint().clone(),
      target: firstVP.view.getTargetPoint()
    }
    savedRooms.push(newRoom);
}}
function AddNewView(newRoomName: string){
  AddNewRoomToDataBase(newRoomName);
  const roomsUL = document.getElementById("roomList");
  if(roomsUL!=null){
    let eee = document.createElement('li');
    eee.className="room__link";
    eee.textContent=newRoomName;
    roomsUL.appendChild(eee);
  }
}
function GoToRoom(e:EventTarget){

  let roomName =(e as HTMLElement).innerText;
  let room = savedRooms.find(r=>r.name===roomName)
  if(room){
    const firstVP = IModelApp.viewManager.getFirstOpenView();
    if (firstVP && firstVP.view.isSpatialView()) {
      firstVP.view.lookAt({
        eyePoint: room.eye,
        upVector: Vector3d.unitZ(),
        targetPoint: room.target,
        lensAngle: Angle.createDegrees(90),
      });
     
      firstVP.synchWithView({ animateFrustumChange: true });
    }
  } 
}


export class RoomsWidgetProvider implements UiItemsProvider {

  public readonly id = 'RoomsWidgetProvider';

  public provideWidgets(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section ? : StagePanelSection
  ): ReadonlyArray < AbstractWidgetProps > {
    const widgets: AbstractWidgetProps[] = [];

    if (
      location === StagePanelLocation.Left &&
      section === StagePanelSection.End
    ) {

      const helloWidget: AbstractWidgetProps = {
        id: 'HelloWidget',
        label: 'Rooms',
        getWidgetContent() {
          const savedRooms2 = [
            {
              name: "Reception",
              eye: Point3d.create(12.407497241246414,5.702534622919199,4.6205268411337475),
              target: Point3d.create(15.143793314168796,7.31083791688283,3.950597154098331)
            },
            {
              name: "Room 1001",
              eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
              target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
            },
            {
              name: "Room 1002",
              eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
              target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
            },
            {
              name: "Room 1003",
              eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
              target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
            },
            {
              name: "Room 1004",
              eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
              target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
            },
            {
              name: "Room 2101",
              eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
              target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
            },
            {
              name: "Room 2102",
              eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
              target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
            },
            {
              name: "Room 2103",
              eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
              target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
            },
            {
              name: "Room 2304",
              eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
              target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
            },
            {
              name: "Room 3051",
              eye: Point3d.create(48.37532295372126,9.636197946762834,11.795594404587614),
              target: Point3d.create(37.56630549961579,4.3931019727088,13.105353453828403)
            },
            {
              name: "Room 3052",
              eye: Point3d.create(43.925059881552556,18.70021085362263,11.353160628667279),
              target: Point3d.create(33.259214744416504,13.526563023387919,12.645571085536224)
            },
            {
              name: "Room 3013",
              eye: Point3d.create(0.5234639197585711,13.642309950733678,1.2519012682212536),
              target: Point3d.create(0.9837701105469177,16.934774862078804,0.7513991738796456)
            },
            {
              name: "Room 3074",
              eye: Point3d.create(36.12892795864733,9.965982879672113,6.954849732008574),
              target: Point3d.create(39.35450149043406,7.319004805551237,7.867958952255404)
            },

            {
              name: "Stairs LVL 1",
              eye: Point3d.create(39.603617263623995,14.311866512060128,11.781061637936398),
              target: Point3d.create(36.61274040026802,13.413217881549125,11.918157154431693)
            },
            {
              name: "Stairs LVL 2",
              eye: Point3d.create(10.275063387681657,14.844116289829307,19.578595217336233),
              target: Point3d.create(14.886480339355856,13.522076278222215,18.893256670720188)
            },
            {
              name: "Stairs LVL 3",
              eye: Point3d.create(39.603617263623995,14.311866512060128,11.781061637936398),
              target: Point3d.create(36.61274040026802,13.413217881549125,11.918157154431693)
            },
          ]
          let value ='';
          return (
            <div>
              <ul id="roomList" className="room__list" onClick={(e)=>{GoToRoom(e.target)}}>
              {savedRooms.map(room => <li className="room__link">{room.name}</li>)}
              </ul>
              <div id="addRoom">
                <button id="btnNew" className="iui-button iui-high-visibility" type="button"
                 onClick={(e)=>{
                  const nameInput = document.getElementById("name") as HTMLInputElement;
                  if(e.currentTarget.textContent=="Save"){
                    e.currentTarget.textContent="+ New";
                    AddNewView(value);
                    if(nameInput) nameInput.value="";
                  }
                  else{
                    nameInput.focus();
                    nameInput.select();
                    e.currentTarget.textContent="Save";
                  }
                  const lblNew = document.getElementsByClassName("new");
                  if(lblNew!=null){
                   Array.from(lblNew).forEach((n)=>n.classList.toggle("temp"));
                  }
                 }}>+ New</button>
                <label id="lblNew" className="iui-input-container temp new">
                  <div className="iui-label iui-required temp new">Name</div>
                  <input className="iui-input temp new" required id="name" name="name"
                   onChange={(e) => (value=e.target.value)}
                  >
                  </input>
                </label>
              </div>
            </div>
          );
        },
      };

      widgets.push(helloWidget);
    }

    return widgets;
  }
}
