import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import './App.css';
var text = [
    "这是专属于你的一个小小网站。",
    "这个网站之所以出现在你的面前，是因为我刚刚梦到了一个欣喜若狂的女孩。",
    "所以我花了一小时，描绘了我在梦中看到的这个网站。",
    "希望你喜欢。",
    "这首曲目名叫concerto d'amore，意思是\"爱的协奏曲\"。",
    "2019年儿童节，我们邂逅于清华大学军乐队专场音乐会。",
    "转眼间，我们相识一周年了。",
    "让我们一起回忆这一年那些难忘的瞬间吧。",
    "别忘了许个愿哦。",
    "儿童节快乐。"
]
var command = "LüJialer> "
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { text: [], current_line: 0, show_underLine: 0 ,wish:''};
        this.handleWishChange = (e) => {
            this.setState({ wish: e.target.value })
        }
        this.handleAdd = () => {
            if (this.state.wish === '') {
                alert("许个愿吧");
                return;
            }
            axios.post('/api/wish',
                {
                    wish: this.state.wish
                })
                .then(() => {
                    alert("我已经收到了你的愿望。")
                })
                .catch((error) => {
                    alert(error.response.data['error']);
                });
        }
        this.f = (line, column) => {
            if (column === 0) {
                setTimeout(() => {
                    this.state.text.push(command);
                    this.setState({ current_line: line });

                    setTimeout(() => {
                        if (line < text.length) {
                            this.setState({ text: this.state.text });
                            if (line < text.length) {
                                this.f(line, 1)
                            }
                        }
                    }, 3000)
                }, 3000)
            }
            else {
                setTimeout(() => {
                    this.setState((prevState) => {
                        prevState.text[this.state.current_line] = command + text[line].substring(0, column);
                        return { text: prevState.text }
                    });
                    if (column < text[line].length) {
                        this.f(line, column + 1)
                    }
                    else {
                        this.f(line + 1, 0)
                    }
                }, 40)
            }
        }
    }
    componentDidMount() {
        this.f(0, 0)
        setInterval(() => {
            this.setState({ show_underLine: this.state.show_underLine + 1 })
            if (this.state.show_underLine % 2) {
                this.underLine = "";
            }
            else {
                this.underLine = "_";
            }
        }, 300)
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.state.text.map((item, i) => {

                        if (this.state.current_line === i) { return <p key={i}>{item}{this.underLine}</p> }
                        else return <p key={i}>{item}</p>
                    })}
                    {
                        this.state.current_line === text.length
                        && <InputGroup className="mb-3">
                        <FormControl
                        onChange={(e) => this.handleWishChange(e)}
                          placeholder="许个愿吧"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={() => this.handleAdd()}>许愿</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    }
                </header>
            </div>
        );
    }

}

export default App;
