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

namespace Notes
{
	
	reg notes = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	reg scale = [4,3,5,0];
	
	const pnlNoteName = Content.getComponent("pnlNoteName");
	pnlNoteName.setPaintRoutine(function(g)
	{
		g.setColour(0x55ffffff);
		g.setFont("verdana", 10.);
		//var a = [0,0,15,25];
		for(i=0;i<16;i++){
			//a[y] = (15-i)*25;
			g.drawAlignedText(Engine.getMidiNoteName(notes[i]), [0,(15-i)*25,22,25], "right");	
		}
	});
	
	inline function initKeyboardColors()
	{
		for(i=0;i<=127;i++){
			Engine.setKeyColour(i, (((i%12)<=4)?(i%2):((i-1)%2))?0x88000000:0x0);	
		}	
	}
	
	function setScale(array)
	{

		scale = array;
		var base = Notes.notes[0];
		setNotes(base);
		
	}
	
	function setNotes(base)
	{
		for(i=0;i<16;i++){
			//Engine.setKeyColour(notes[i],0x0);
			//set keycolor white or black based on note number
			Engine.setKeyColour(notes[i], (((notes[i]%12)<=4)?(notes[i]%2):((notes[i]-1)%2))?0x88000000:0x0);
		}
	
		var j = 0;
		for(i=0;i<16;i++){
			if(notes[i]!=base){
				if(Output.noteID[i]>=0){
					Synth.noteOffByEventId(Output.noteID[i]);
					Console.print("Silenced orphan "+ i);
					Output.noteID[i] = -1;
				}
			}
			notes[i] = base;
			base += scale[j];
			j = (j+1)%scale.length;	
		}
		for(i=0;i<16;i++){
			Engine.setKeyColour(notes[i],0x550000ff);	
		}	
		pnlNoteName.repaint();
	}
}