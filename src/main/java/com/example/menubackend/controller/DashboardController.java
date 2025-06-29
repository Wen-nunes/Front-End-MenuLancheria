package com.example.menubackend.controller;

import com.example.menubackend.model.Pedido;
import com.example.menubackend.service.PedidoService;
import com.example.menubackend.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> getEstatisticas() {
        Map<String, Object> estatisticas = new HashMap<>();

        estatisticas.put("pedidosPendentes", pedidoService.countByStatus(Pedido.StatusPedido.PENDENTE));
        estatisticas.put("pedidosConfirmados", pedidoService.countByStatus(Pedido.StatusPedido.CONFIRMADO));
        estatisticas.put("pedidosProntos", pedidoService.countByStatus(Pedido.StatusPedido.PRONTO));
        estatisticas.put("pedidosCancelados", pedidoService.countByStatus(Pedido.StatusPedido.CANCELADO));

        return ResponseEntity.ok(estatisticas);
    }

    @GetMapping("/resumo-pedidos")
    public ResponseEntity<Map<String, Object>> getResumoPedidos() {
        Map<String, Object> resumo = new HashMap<>();

        long pedidosPendentes = pedidoService.countByStatus(Pedido.StatusPedido.PENDENTE);
        long pedidosConfirmados = pedidoService.countByStatus(Pedido.StatusPedido.CONFIRMADO);

        resumo.put("pedidosParaAtender", pedidosPendentes + pedidosConfirmados);
        resumo.put("pedidosProntosParaEntrega", pedidoService.countByStatus(Pedido.StatusPedido.PRONTO));

        return ResponseEntity.ok(resumo);
    }
} 