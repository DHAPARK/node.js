module.exports = (app,fs)=>{
    // localhost:3000
    app.get('/',(req,res)=>{
        res.render('index.ejs',{
            length: 10
        });
    });
    //localhost:3000/about
    app.get('/about',(req,res)=>{
        res.render('about.html');
    })
    //localhost:3000/list
    app.get('/list',(req,res)=>{
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            console.log(data);
            res.writeHead(200,{'content-type':'text/json;charset=utf-8'});
            res.end(data);
        });
    });
    //localhost:3000/getMember/
    app.get('/getMember/:userid',(req,res)=>{
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            const member = JSON.parse(data);
            res.json(member[req.params.userid]);

        })
    });

    app.post('/joinMember/:userid',(req,res)=>{
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] = "invalid request";
            res.json(result);
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            const member = JSON.parse(data);
            if(member[userid]){
                result['success'] = 101;
                result['msg'] = "duplicate";
                res.json(result);
                return false;
            }
            console.log(req.body);
            member[userid] = req.body; //member[json]: {name:'제이슨',password:'1234'} 이렇게 담아준다는 얘기
            fs.writeFile(__dirname + "/../data/member/json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
                result["success"]=200;
                result["msg"]="success";
                res.json(result);
            });
        });
    });

    app.put('/updateMember/:userid',(req,res)=>{
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] = "invalid request";
            res.json(result);
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
            console.log(data);
            const memeber = JSON.parse(data);
            member[userid]=req.body;
            fs.writeFile(__dirname+"/../data/member.json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
                result["success"]=200;
                result["msg"]="success";
                res.json(result);
                               
            });
        });
    });
    /* 
        method : delete 지우는역할
        1. 아이디가 있는지 여부를 걸러주고
        2. 해당 아이디가없으면 102,not found라고 나오고
        3. 삭제는하는데 자바스크립트에 객체를 지우는방법 하긴했는데
        // 객체 삭제하는법은 delete라는걸 사용하는데 delete member[?]
        이러면 해당 객체가 사라지는데 이거를 이용하면될듯

    */
    app.delete('delMember/:userid',(req,res)=>{
        let result = {};
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            console.log(data);
            const member = JSON.parse(data);
            if(member[req.params.userid]){
                result["success"] = 102;
                result["msg"] = "not found";
                res.json(result);
                return false;
            }
            delete member[req.params.userid];
            fs.writeFile(__dirname+"/../data/member.json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
                result["success"]=200;
                result["msg"]="success";
                res.json(result);
                               
            });
        });
    })


}