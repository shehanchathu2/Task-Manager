package com.example.task.manager.service;


import com.example.task.manager.model.Role;
import com.example.task.manager.model.Task;
import com.example.task.manager.model.User;
import com.example.task.manager.repository.TaskRepository;
import com.example.task.manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task create (Task task , String email){
        User user = userRepository.findByEmail(email).orElseThrow();

        task.setUser(user);
        task.setCreatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }

    public Page<Task> getTasks(String email , Role role , Pageable pageable){


        if(role == Role.ADMIN){
            return taskRepository.findAll(pageable);
        }

        User user = userRepository.findByEmail(email).orElseThrow();
        System.out.println("user role is : "+role);
        return taskRepository.findByUser(user,pageable);
    }

    public void deleteTask(Long id){
         taskRepository.deleteById(id);
    }

    public Task getOneTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setPriority(updatedTask.getPriority());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }
}
