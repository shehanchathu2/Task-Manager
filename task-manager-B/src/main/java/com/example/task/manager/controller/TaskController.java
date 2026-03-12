package com.example.task.manager.controller;


import com.example.task.manager.model.*;
import com.example.task.manager.service.AuthService;
import com.example.task.manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task , Authentication authentication){
        String email = authentication.getName();

        Task createdTask = taskService.create(task,email);
        return ResponseEntity.status(201).body(createdTask); 
    }

    @GetMapping
    public ResponseEntity<Page<Task>> getTasks(Authentication authentication , Pageable pageable){
        String email = authentication.getName();

        Role role = authentication.getAuthorities()
                .stream()
                .map(a -> Role.valueOf(a.getAuthority()))
                .findFirst()
                .orElse(Role.USER);

        Page<Task> tasks = taskService.getTasks(email,role,pageable);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deteleTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return ResponseEntity.status(200).body("Task delete successfully"); // 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = taskService.getOneTask(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Task>> getTasks(
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String status,
            Pageable pageable,
            Authentication authentication
    ) {

        String email = authentication.getName();
        Role role = authService.getRoleByEmail(email);

        Page<Task> tasks = taskService.getTasks(email, role, priority, status, pageable);

        return ResponseEntity.ok(tasks);
    }
}