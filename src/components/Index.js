import React, { Component } from 'react'
import axios from 'axios'
import ReactSvgPieChart from "react-svg-piechart"
import './MyStyles.css'



const heading ={
    fontSize: '42px',
    color: 'blue'
}
const text ={
    fontSize: '32px',
    color: 'purple'
}

const textstyle={
    fontSize:'30px'
}

const piestyle={
    width:'400px',
    height:'400px',
    align:'center'
}




 class Index extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              theText: null,
              Analytical:0,
              Confident:0,
              Disrespectful: 0,
              Doubtful: 0,
              Friendly: 0,
              Hostile: 0,
              Joyful: 0,
              Optimistic: 0,
              Pessimistic: 0,
              Respectful: 0,
              Sad: 1,
              Urgent: 0,
              generatedText:"",
              

            
         }
     }

     maxValues(o, n) {
        // Get object values and sort descending
        const values = Object.values(o).sort((a, b) => b - a);
        
        // Check if more values exist than number required
        if (values.length <= n) return o;
        
        // Find nth maximum value
        const maxN = values[n - 1];
        
        // Filter object to return only key/value pairs where value >= maxN
        return Object.entries(o)
            .reduce((o, [k, v]) => v >= maxN ? { ...o, [k]: v } : o, {});
    }
     

    handleSubmit=(event)=>{
        event.preventDefault()
        const data= this.state.theText
        console.log( data)
        axios.get('https://salty-castle-75937.herokuapp.com/?q=%22yes%20this%20is%20a%20test%22',{
        params: {
            q:data
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(response =>{
            var a = Object.keys(this.maxValues(response.data,3));
            var text = "This Sentence  primarily reflects 3 emotions- Being : "+ a[0] +", "+a[1]+" and "+a[2];
            this.setState({
                Analytical:response.data.Analytical,
                Confident:response.data.Confident,
                Disrespectful: response.data.Disrespectful,
                Doubtful: response.data.Doubtful,
                Friendly: response.data.Friendly,
                Hostile: response.data.Hostile,
                Joyful: response.data.Joyful,
                Optimistic: response.data.Optimistic,
                Pessimistic: response.data.Pessimistic,
                Respectful: response.data.Respectful,
                Sad: response.data.Sad,
                Urgent: response.data.Urgent,
                generatedText:text
                
            })
        })
        .catch(error =>{
            console.log(error)
        })
        

    }

    handleInputChange =(event)=>{
        event.preventDefault()
        // console.log(event)
        // console.log(event.target.name)
        // console.log(event.target.value)
        this.setState({
            theText: event.target.value
        })

    }

    
     

    render() {
        const {theText, generatedText}= this.state
        const data = [
            {title: "Analytical", value: this.state.Analytical, color: "#22594e"},
            {title: "Sad", value: this.state.Sad, color: "#2f7d6d"},
            {title: "Confident", value: this.state. Confident, color: "#ccff33"},
            {title: "Disrespectful", value: this.state.Disrespectful, color: "#330080"},
            {title: "Doubtful", value: this.state. Doubtful, color: "#b380ff"},
            {title: "Friendly", value: this.state. Friendly, color: "#86b300"},
            {title: "Hostile", value: this.state.Hostile, color: "#ff1a75"},
            {title: "Joyful", value: this.state.Joyful, color: "#006080"},
            {title: "Optimistic", value: this.state.Optimistic, color: "#ff0000"},
            {title: "Pessimistic", value: this.state.Pessimistic, color: "#3da18d"},
            {title: "Respectful", value: this.state.Respectful, color: "#999966"},
            {title: "Urgent", value: this.state.Urgent, color: "#ff4dff"},
        ]
        return (
            <div className='primary'> 
                <div style={heading}>
                    Emotion of the Text </div> 
                
             
                <h2>Write a sentence to test its emotion:</h2>
                <br>
                </br>
                <h3 style={text}>{theText}</h3>
                
                <form onSubmit={this.handleSubmit}>
                
                <p><input type='text' name='theText' onChange={this.handleInputChange}></input></p>
                <br></br>
                <br></br>
                <p><button type='submit' >GO!</button></p>
               
                <br></br>
                
                </form>
                <div style={textstyle}>{generatedText}</div>

                <div  class='container'>
                    <div style={piestyle} class="col-12 align-self-center">
                       <ReactSvgPieChart
 
                    data={data}
                    // If you need expand on hover (or touch) effect
                    expandOnHover
                    onSectorHover={(d, i, e) => {
                        // if (d) {
                        //     console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                        // } else {
                        //     console.log("Mouse leave - Index:", i, "Event:", e)
                        // }
                    }}
                />  </div> 
                </div>
                
            
                 
                
                
            </div>
        )
    }
}

export default Index
