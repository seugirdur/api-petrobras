const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');

router.post('/textoInternet', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM textoInternet WHERE idSolucao = ?;`;
            conn.query(query, [req.body.idSolucao], (error, resultado, fields) => {
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

router.post('/textoLentidao', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM textoLentidao WHERE idSolucao = ?;`;
            conn.query(query, [req.body.idSolucao], (error, resultado, fields) => {
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

router.post('/textoEquipamentos', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM textoEquipamento WHERE idSolucao = ?;`;
            conn.query(query, [req.body.idSolucao], (error, resultado, fields) => {

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

router.post('/textoOutros', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM textoOutros WHERE idSolucao = ?;`;
            conn.query(query, [req.body.idSolucao], (error, resultado, fields) => {

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