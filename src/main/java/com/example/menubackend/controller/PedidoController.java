package com.example.menubackend.controller;

import com.example.menubackend.dto.CriarPedidoDTO;
import com.example.menubackend.dto.PedidoDTO;
import com.example.menubackend.model.Pedido;
import com.example.menubackend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoDTO> criarPedido(@RequestBody CriarPedidoDTO criarPedidoDTO) {
        Optional<PedidoDTO> pedido = pedidoService.create(criarPedidoDTO);
        return pedido.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/pedidos/cliente/{telefone}")
    public ResponseEntity<List<PedidoDTO>> getPedidosPorTelefone(@PathVariable String telefone) {
        List<PedidoDTO> pedidos = pedidoService.findByTelefone(telefone);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/pedidos/{id}")
    public ResponseEntity<PedidoDTO> getPedido(@PathVariable Long id) {
        Optional<PedidoDTO> pedido = pedidoService.findById(id);
        return pedido.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/admin/pedidos")
    public ResponseEntity<List<PedidoDTO>> getAllPedidos() {
        List<PedidoDTO> pedidos = pedidoService.findAll();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/admin/pedidos/status/{status}")
    public ResponseEntity<List<PedidoDTO>> getPedidosPorStatus(@PathVariable Pedido.StatusPedido status) {

        List<PedidoDTO> pedidos = pedidoService.findByStatus(status);
        return ResponseEntity.ok(pedidos);
    }

    @PatchMapping("/admin/pedidos/{id}/status/{status}")
    public ResponseEntity<PedidoDTO> updateStatus(@PathVariable Long id, @PathVariable Pedido.StatusPedido status) {
        Optional<PedidoDTO> pedido = pedidoService.updateStatus(id, status);
        return pedido.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/pedidos/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        boolean deleted = pedidoService.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/admin/pedidos/contagem/{status}")
    public ResponseEntity<Long> countPedidosPorStatus(@PathVariable Pedido.StatusPedido status) {
        long count = pedidoService.countByStatus(status);
        return ResponseEntity.ok(count);
    }
} 