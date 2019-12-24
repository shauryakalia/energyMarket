import React, { Component } from 'react';


class Timer extends Component {
  constructor(props){
    super(props);
    this.state={windowSecs:Number(props.timerCounts)/1000}      //windowSecs in sec
   //this.tick=this.tick.bind(this);
   //this.activateCounterOperation()
  }


componentDidMount=()=>{
    setInterval(()=>this.setState({windowSecs:this.state.windowSecs-1}),1000);
}
tick=()=>{
this.setState({windowSecs:this.state.windowSecs-1})        //i.e decreasing windowSecs by 1 in every sec
}

format=()=>{
    var totalSeconds = this.state.windowSecs;
     var seconds = totalSeconds % 60;
    var minutes = Number(totalSeconds / 60);
    var time = parseInt(minutes) + ":" + parseInt(seconds);
    return time;
}

  render() {
    const tagLine=<b> Remaining Time: </b>;
    return (
     <div>
         {
            this.state.windowSecs>0? tagLine:null
        }

        {
            this.state.windowSecs>0? this.format():null
        }
       </div>
    );
  }
}

export default Timer;