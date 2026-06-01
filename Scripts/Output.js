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

namespace Output
{

	reg channelOut = 1;
	reg isMidiOut = false;
	reg noteID = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	reg noteIDOrphans = [];
	
	const synths = [
		Synth.getChildSynth("Synth1 Sine Wave Generator"),
		Synth.getChildSynth("Synth2 Waveform Generator"),
		Synth.getChildSynth("Midi1 Silent Synth")
		];
		
	inline function oncbOutputControl(component, value)
	{
		if(value==4){
			Output.isMidiOut = false;	
			Output.channelOut = 1; //fix this later
			synths[0].setBypassed(true);
			synths[1].setBypassed(true);
			synths[2].setBypassed(true);
		}else if(value==3){
			isMidiOut = true;	
			channelOut = 1; //fix this later
			synths[0].setBypassed(true);
			synths[1].setBypassed(true);
			synths[2].setBypassed(false);
		}else{
			isMidiOut = false;
			channelOut = value;
			synths[0].setBypassed(channelOut!=1);
			synths[1].setBypassed(channelOut!=2);
			synths[2].setBypassed(true);
		}
	};
	
	Content.getComponent("cbOutput").setControlCallback(oncbOutputControl);	
}