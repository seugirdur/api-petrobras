const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');

router.post('/internet', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                deumerda: error
            })
        }
        
            const query = `SELECT * FROM Internet WHERE idTitulo = ?;`;
            conn.query(query, [req.body.idTitulo], (error, resultado, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultado.length < 1) {
                    return res.status(200).send({
                        "error": true,
                        "message": "Problema nao existe",
                    });
                }
               
                    if (resultado) {

                         return res.status(200).json(resultado);

                    }
                    return res.status(200).send({
                        "error": true,
                        "message": "Falha na busca de itens",

                    });
                
            });
        

    });



});

router.post('/lentidao', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM Lentidao WHERE idTitulo = ?;`;
            conn.query(query, [req.body.idTitulo], (error, resultado, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultado.length < 1) {
                    return res.status(200).send({
                        "error": true,
                        "message": "Problema nao existe",
                    });
                }
               
                    if (resultado) {

                         return res.status(200).json(resultado);

                    }
                    return res.status(200).send({
                        "error": true,
                        "message": "Falha na busca de itens",

                    });
                
            });
        

    });



});

router.post('/equipamentos', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM Equipamento WHERE idTitulo = ?;`;
            conn.query(query, [req.body.idTitulo], (error, resultado, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultado.length < 1) {
                    return res.status(200).send({
                        "error": true,
                        "message": "Problema nao existe",
                    });
                }
               
                    if (resultado) {

                         return res.status(200).json(resultado);

                    }
                    return res.status(200).send({
                        "error": true,
                        "message": "Falha na busca de itens",

                    });
                
            });
        

    });



});

router.post('/outros', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        //trying to see if works
            const query = `SELECT * FROM Outros WHERE idTitulo = ?;`;
            conn.query(query, [req.body.idTitulo], (error, resultado, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultado.length < 1) {
                    return res.status(200).send({
                        "error": true,
                        "message": "Problema nao existe",
                    });
                }
               
                    if (resultado) {

                         return res.status(200).json(resultado);

                    }
                    return res.status(200).send({
                        "error": true,
                        "message": "Falha na busca de itens",

                    });
                
            });
        

    });



});
module.exports = router;