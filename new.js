import mysql from 'mysql2'
import dotenv from 'dotenv'

const pool=mysql.createPool({
    host:"localhost",
    user: "root",
    password:"",
    database:"blog" 
}).promise()

export async function getnotes(){
    const [rows]=await pool.query('select * from  posts inner join users on posts.userid = users.id');
    console.log(rows)
    return rows
}


export async function getPostById(id){
    const [rows] = await pool.query('SELECT * FROM `posts` WHERE id = ?', [id]);
    console.log(rows)
    return rows[0]
} 
export async function posts(){
    const [rows]=await pool.query('SELECT * FROM `posts` where 1');
    console.log(rows)
    return rows
}                                                                                                           
export async function creating(id,userid,title,content) {
    const [result]=await pool.query("Insert Into `posts` (id,userid,title,content) Values(?,?,?,?)",[id,userid,title,content])
    // const id=result.insertId..........INSERT INTO `posts`(`id`, `userid`, `title`, `content`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')
    result.insertId   
    
    return getPostById(result.insertId) 
}



export async function patchusers(id,title) {
    const [result]=await pool.query('UPDATE `posts` SET title = ? WHERE `id` = ?',[title,id])
    // return getPostById(result.insertId)
    // return result
    return (`no. of rows affected = ${result.affectedRows}`)
}

export async function putusers(id,userid,title,content) {
    const [result]=await pool.query('UPDATE `posts` SET userid = ? , title = ? , content = ? WHERE `id` = ?',[userid,title,content,id])
    // return getPostById(result.insertId)
    return (`no. of rows affected = ${result.affectedRows}`)
    
}


export async function deleteNOTE(id) {
    const [result] = await pool.query("DELETE FROM `posts` WHERE  id =?",[id])
    return (`no. of rows affected = ${result.affectedRows}`)
}



    // if(id){
        //     // return (`no. of rows affected = ${result.affectedRows}`)
        // }
    //}
    
    // const id=result.insertId
    // return getnote(id) 
    // delete result.insertId   
    // console.log(result);
    // const table2 = await deleteNOTE()
    // console.log(table2);
    
    
    // // const table1 = await posts()
    // // console.log(table1);
    
    // export async function users(id){
    //     const [rows] = await pool.query('SELECT * FROM `users` WHERE id = ?', [id]);
    //     console.log(rows)
    //     return rows[0]
    // }                                                                                                           