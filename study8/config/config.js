module.exports = {
    server_port : 3000,
    db_url : 'mongodb://localhost:27017/nodedb',
    db_schema : [{file:'./member_schema',collection:'member2',schemaName:'MemberSchema',modelName:'MembeerModel'}],
    route_info: [],
    facebook : {
        clientID :'404644524064140',
        clientSecret :'4bada4bec354776c25d37a4de11491c6Rese',
        callbackURL:'http://localhost:3000/auth/facebook/callback',
        
    }
}