module.exports = {
  local: {
    fqdn: 'http://localhost:1337',
    rds: {
      'host': '127.0.0.1',
      'port': '3308',
      'user': 'db_user',
      'password': 'test1234',
      'database': 'mydb'
    },
    redis: { 
      host: '127.0.0.1',
      port: 6379
    }
  }
};
