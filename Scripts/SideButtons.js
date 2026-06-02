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

namespace SideButtons
{
	inline function onbtnLoadControl(component, value)
	{
	//Console.print("LoadControl");

		if(value==0)
			return;
			
		timeTick=0;
		scanPosion = 0;
	
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				cells[i][j] = savedCells[i][j];	
			}
		}
		Grid.pnlCells.changed();
		Grid.pnlCells.repaint();
	};
	Content.getComponent("btnLoad").setControlCallback(onbtnLoadControl);

	inline function onbtnSaveControl(component, value)
	{
		if(value==0)
			return;
	
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				savedCells[i][j] = cells[i][j];	
			}
		}
	};
	Content.getComponent("btnSave").setControlCallback(onbtnSaveControl);
	
	inline function onbtnRandomControl(component, value)
	{
		if(value==0){
			return;
		}
		timeTick=0;
		local p = Content.getComponent("RndPctKnob").getValue();
		for(i=0;i<16;i++){
			for(j=0;j<16;j++){
				cells[i][j] = (Math.random()<p);	
			}
		}
		Grid.pnlCells.changed();
		Grid.pnlCells.repaint();
	};
	Content.getComponent("btnRandom").setControlCallback(onbtnRandomControl);

	inline function onbtnClearControl(component, value)
	{
		if(value==0)
			return;
		
		cells = [
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
		Grid.pnlCells.changed();
		Grid.pnlCells.repaint();
	};
	Content.getComponent("btnClear").setControlCallback(onbtnClearControl);
	
}