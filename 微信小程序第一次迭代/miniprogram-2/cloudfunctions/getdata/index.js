// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var table=event.table
  var num=5
  var page=event.page
  var obj=event.obj
  var serch_obj={}
  if(obj.trade!=""){
    serch_obj.trade= _.eq(obj.trade)
  }
  if(obj.location!=""){
    serch_obj.location= _.eq(obj.location)
  }
  if(obj.position!=""){
    serch_obj.position= _.eq(obj.position)
  }
  if(obj.salary!=""){
    serch_obj.salary=_.gte(Number(obj.salary))
  }
  //return await db.collection("test01").limit(num).get()
  return await db.collection(table).where(serch_obj).skip(page).limit(num).get()
  
}