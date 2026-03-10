/**
=======================================================================
SimpleConway - Sequencer to make Conway's Game of Life music.
Copyright (C) 2026  Jack Huppert
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see https://www.gnu.org/licenses/.
=======================================================================
**/

Console.clear();
Content.makeFrontInterface(560, 560);
Content.getComponent("Version").set("text", (Engine.isPlugin()?"VST":"SA")+" Ver "+Engine.getVersion());

namespace MainSettings
{
	inline function onbtnSettingsControl(component, value)
	{
		Content.getComponent("pnlSettings").set("visible",value);
	};
	Content.getComponent("btnSettingsShow").setControlCallback(onbtnSettingsControl);
}





reg timeTick = 0;
reg scanPosion = 0; 
reg updateEvery = 16;
reg stepEnabled = false;

global velocity =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
global pan =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

global cells = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

global newCells = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

global savedCells = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

namespace Grid
{
	const pnlCells = Content.getComponent("pnlCells");
	
	const a = pnlCells.getLocalBounds(0);
	const cellsX = a[0];
	const cellsY = a[1];
	const cellWidth = a[2]/16;
	const cellHeight = a[3]/16;
	
	//const ALIVE_COLOR = 0xFFCCCCCC;
	//const DEAD_COLOR = Colours.black;
	//const PLAYING_ALIVE_COLOR = Colours.white;
	
	
	const STATE_COLOR = [Colours.black, 0xFFCCCCCC];
	const PLAYING_COLOR = [Colours.black, Colours.white];
	
	const LINE_COLOR = Colours.withAlpha(0x8888FF, 0.5);
	
	pnlCells.setMouseCallback(function(event){
	    if(event.clicked){
		    Console.print("Clicked " +event.x+","+event.y);
		    
		    var x = event.x/cellWidth;
		    var y = event.y/cellHeight;
		    cells[y][x] = 1-cells[y][x];
		    
		    pnlCells.changed();
		    pnlCells.repaint();
	    }
	});
	
	pnlCells.setPaintRoutine(function(g){
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				if(cells[i][j]==0){
					g.setColour(STATE_COLOR[0]);		
				}else{
					if(j==timeTick%16){
						g.setColour(PLAYING_COLOR[1]);
					}else{
						g.setColour(STATE_COLOR[1]);	
					}	
				}
				g.fillRect([cellsX+j*cellWidth,cellsY+i*cellHeight,cellWidth-1,cellHeight-1]);
			}
		}
		g.setColour(LINE_COLOR);
		
		g.drawLine(cellsX+scanPosion*cellWidth+1, cellsX+scanPosion*cellWidth+1, cellsY, cellsY+cellHeight*16, 3);
		
	});
	
}

include("Output.js");
include("Notes.js");
include("SideButtons.js");

Notes.initKeyboardColors();
Notes.setNotes(48);


inline function onbtnStartControl(component, value)
{
	if(value){
		if(scanPosion==16){
		}else if(timeTick%16==0){
			scanPosion = 16;
		}else{
			
		}
		Synth.startTimer(7.5/Content.getComponent("BPMKnob").getValue());
		component.set("text","Stop");	
	}else{
		Synth.stopTimer();
		component.set("text","Start");	
	}	
};
const btnStart = Content.getComponent("btnStart");
btnStart.setControlCallback(onbtnStartControl);

inline function onbtnStepControl(component, value)
{
	stepEnabled = value;	
};
Content.getComponent("btnStep").setControlCallback(onbtnStepControl);

inline function onbtnUpdateControl(component, value)
{
	if(value){
		local temp = lblUpdateEvery.getValue(); 
		updateEvery = (temp<1) ? 1 : parseInt(temp);
		lblUpdateEvery.set("text",updateEvery);
	}else{
		updateEvery = 0;
	}
};
Content.getComponent("btnUpdate").setControlCallback(onbtnUpdateControl);

inline function onlblUpdateEveryControl(component, value)
{
	local temp = lblUpdateEvery.getValue(); 
			
	temp = (temp<1) ? 1 : parseInt(temp);
	lblUpdateEvery.set("text",temp);

	if(lblUpdateEvery.getValue()){
		updateEvery=temp;
	}
};
const lblUpdateEvery = Content.getComponent("lblUpdateEvery");
lblUpdateEvery.setControlCallback(onlblUpdateEveryControl);

const VelSlider = Content.getComponent("VelSlider");
const PanSlider = Content.getComponent("PanSlider");
const OctaveSlider = Content.getComponent("OctaveSlider");

namespace ColorSelect
{
	const LAF_4ColorBox = Content.createLocalLookAndFeel();
	reg color1 = 0xff000000;  // 1.....2
	reg color2 = 0xff0000ff;  // .     .
	reg color3 = 0xff00ffff;  // .     .
	reg color4 = 0xffffffff;  // 4.....3
	
	LAF_4ColorBox.registerFunction("drawToggleButton", function(g, obj) {
		var a = obj.area;
		var top;
		var bot;
		for(i=0; i<a[2];i++){
			top = Colours.mix(color1, color2, i/a[2]);
			bot = Colours.mix(color4, color3, i/a[2]);
			g.setGradientFill([top,i,0,bot,i,a[3]]);
			g.drawLine(i, i, 0.0, a[3], 1);
		}
	});
	
	const btnColorBox = Content.getComponent("btnColorBox");
	btnColorBox.setLocalLookAndFeel(LAF_4ColorBox);
	
	
	const selectColorRGB = [204/255,204/255,204/255,1];
	
	const SelectColorPanel = Content.getComponent("SelectColorPanel");
	SelectColorPanel.setPaintRoutine(function(g){
	
		//g.setColour(Colours.fromVec4(selectColorRGB));
		//g.fillRect([0,0,50,50]);
		g.fillAll(Colours.fromVec4(selectColorRGB));
		g.setColour(this.get("itemColour2"));
		g.drawRect([0,0,50,50],1);
	});
	
	inline function onRedKnobControl(component, value)
	{
		selectColorRGB[0] = value/255;
		Grid.STATE_COLOR[1] = Colours.fromVec4(selectColorRGB);
		SelectColorPanel.repaint();
	};
	Content.getComponent("RedKnob").setControlCallback(onRedKnobControl);
	
	inline function onGreenKnobControl(component, value)
	{
		selectColorRGB[1] = value/255;
		Grid.STATE_COLOR[1] = Colours.fromVec4(selectColorRGB);
		SelectColorPanel.repaint();
	};
	Content.getComponent("GreenKnob").setControlCallback(onGreenKnobControl);
	
	inline function onBlueKnobControl(component, value)
	{
		selectColorRGB[2] = value/255;
		Grid.STATE_COLOR[1] = Colours.fromVec4(selectColorRGB);
		SelectColorPanel.repaint();
	};
	Content.getComponent("BlueKnob").setControlCallback(onBlueKnobControl);
	
}
function onNoteOn()
{
	var note = Message.getNoteNumber();
	
	setNotes(note);
	
	Message.ignoreEvent(true);

	//Console.print("lalala" + note);

}
 function onNoteOff()
{
	var note = Message.getNoteNumber();
	
	Message.ignoreEvent(true);
	
	//Console.print("shhh" + note);
}
 function onController()
{
	
}
 function onTimer()
{

	local jtick  = timeTick%16;
	local utick = (updateEvery==0)?-1:(timeTick%updateEvery);
	if(scanPosion==16){
		utick =-1;
	}

	local playNotes=true;
	if(jtick==0 && stepEnabled && scanPosion!=16){
		Synth.stopTimer();
		scanPosion = 16;
		startButton.setValue(false);
		startButton.set("text","Start");
		// dont't play new notes, but end old ones
		playNotes = false;
	}else{
		scanPosion = jtick;
	}


	//Console.print("timer running "+timeTick + " utick="+ utick);
	local r	= Content.getComponent("cbRule").getValue();

	if(utick==0){
		var newValue;
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				/*
				//flat
				newValue = (cells[i+1][j]==undefined?0:cells[i+1][j]);
				newValue += (cells[i+1][j+1]==undefined?0:cells[i+1][j+1]);
				newValue += (cells[i][j+1]==undefined?0:cells[i][j+1]);
				newValue += (cells[i-1][j+1]==undefined?0:cells[i-1][j+1]);
				newValue += (cells[i-1][j]==undefined?0:cells[i-1][j]);
				newValue += (cells[i-1][j-1]==undefined?0:cells[i-1][j-1]);
				newValue += (cells[i][j-1]==undefined?0:cells[i][j-1]);
				newValue += (cells[i+1][j-1]==undefined?0:cells[i+1][j-1]);
				*/
				
				//torrus
				newValue = cells[(i+1)%16][j];
				newValue += cells[(i+1)%16][(j+1)%16];
				newValue += cells[i][(j+1)%16];
				newValue += cells[(i+15)%16][(j+1)%16];
				newValue += cells[(i+15)%16][j];
				newValue += cells[(i+15)%16][(j+15)%16];
				newValue += cells[i][(j+15)%16];
				newValue += cells[(i+1)%16][(j+15)%16];
			
				switch(r){
				case 1: //B3/S23
				newCells[i][j] = cells[i][j]?((newValue==2||newValue==3)?1:0):(newValue==3?1:0);
				break;
				case 2: //B36/S23
				newCells[i][j] = cells[i][j]?((newValue==2||newValue==3)?1:0):((newValue==3||newValue==6)?1:0);
				break;
				case 3: //B34/S34
				newCells[i][j] = cells[i][j]?((newValue==3||newValue==4)?1:0):((newValue==3||newValue==4)?1:0);
				break;
				case 4: //B2/S
				newCells[i][j] = cells[i][j]?0:((newValue==2)?1:0);
				break;
				case 5: //B25/S4
				newCells[i][j] = cells[i][j]?((newValue==4)?1:0):((newValue==2||newValue==5)?1:0);
				break;
				case 6: //B1357/S1357
				newCells[i][j] = cells[i][j]?((newValue%2==1)?1:0):((newValue%2==1)?1:0);
				break;
				case 7: //B3/S012345678
				newCells[i][j] = cells[i][j]?1:((newValue==3)?1:0);
				break;
				case 8: //B35678/S5678
				newCells[i][j] = cells[i][j]?((newValue>=5)?1:0):((newValue==3||newValue>=5)?1:0);
				break;
				case 9: //B36/S125
				newCells[i][j] = cells[i][j]?((newValue==1||newValue==2||newValue==5)?1:0):((newValue==3||newValue==6)?1:0);
				break;
				case 10: //B3678/S34678
				newCells[i][j] = cells[i][j]?((newValue>=6||newValue==3||newValue==4)?1:0):((newValue>=6||newValue==3)?1:0);
				break;
				case 11: //B368/S245
				newCells[i][j] = cells[i][j]?((newValue==3||newValue==6||newValue==8)?1:0):((newValue==2||newValue==4||newValue==5)?1:0);
				break;
				case 12: //B4678/S35678
				newCells[i][j] = cells[i][j]?((newValue>=5||newValue==3)?1:0):((newValue>=6||newValue==4)?1:0);
				break;
				
				case 13: //B/S012345678
				newCells[i][j] = cells[i][j];
				break;
				case 14: //B1/S012345678
				newCells[i][j] = cells[i][j]?(1):((newValue==1)?1:0);
				break;
				case 15: //B2/S012345678
				newCells[i][j] = cells[i][j]?(1):((newValue==2)?1:0);
				break;
				}
				
			}	
		}
		// swap old cells with updated cells
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				cells[i][j] = newCells[i][j];
			}	
		}
	}

	//play notes under the scan line
	for(i = 0;i<16;i++){
		if(cells[i][jtick]==1 && Output.noteID[15-i]<0 && playNotes){
			if(Output.isMidiOut){
				//Console.blink();
				//Console.print("MidiNoteOn:"+ Notes.notes[15-i]);
				if(Notes.notes[15-i]<127){
					Output.noteID[15-i] = Synth.playNote(Notes.notes[15-i], velocity[jtick]);
				}else{
					Output.noteID[15-i] = -1;
				}
				
			}else {
				//Console.blink();
				//Console.print("NoteOn:"+ Notes.notes[15-i]);
				if(Notes.notes[15-i]>=0 && Notes.notes[15-i]<127){
					//Console.print("vel =" + velocity[jtick]);
					Output.noteID[15-i] = Synth.playNote(Notes.notes[15-i], velocity[jtick]);
				}else{
					Output.noteID[15-i] = -1;
				}
			}	
		}else if(cells[i][jtick]==0 && Output.noteID[15-i]>=0){
			if(Output.isMidiOut){
				//Console.print("Midi NoteOff:"+ notes[15-i]);
				Synth.noteOffByEventId(Output.noteID[15-i]);
				Output.noteID[15-i] = -1;
			}else{
				//Console.print("NoteOff:"+ notes[15-i]);
				Synth.noteOffByEventId(Output.noteID[15-i]);
				Output.noteID[15-i] = -1;
			}
		}
	}
	
	if(!playNotes){
		playNotes = true;
	}else{
		timeTick++;	
	}
	
	
	Grid.pnlCells.changed();
	Grid.pnlCells.repaint();
}
 function onControl(number, value)
{

	if (number == OctaveSlider)
	{
		const Keyboard = Content.getComponent("Keyboard");

		const data = {
			"Type": "Keyboard",		
			"KeyWidth": 14.0,
			"DisplayOctaveNumber": true,
			"LowKey": OctaveSlider.getSliderValueAt(0)*12,
			"HiKey": OctaveSlider.getSliderValueAt(0)*12+48,
			"CustomGraphics": false,
			"DefaultAppearance": true,
			"BlackKeyRatio": 0.699999988079071,
			"ToggleMode": false,
			"MidiChannel": 1,
			"UseVectorGraphics": true,
			"UseFlatStyle": false,
			"MPEKeyboard": false,
			"MPEStartChannel": 2,
			"MPEEndChannel": 16
		};
		Keyboard.setContentData(data);
	}else if(number == VelSlider){
		for(i=0;i<16;i++){
			velocity[i]=VelSlider.getSliderValueAt(i);
		}	
	}else if(number == PanSlider){
		for(i=0;i<16;i++){
			pan[i]=PanSlider.getSliderValueAt(i);
		}	
	}
}
 