import { Component, OnInit, HostListener } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-page-not-found-page',
  imports: [
    NgForOf,
    NgIf,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './page-not-found-page.component.html',
  standalone: true,
  styleUrl: './page-not-found-page.component.scss'
})

export class PageNotFoundPageComponent implements OnInit {
  dinoBottom = 0;
  isJumping = false;
  jumpHeight = 150;
  jumpDuration = 500;
  gravity = 0.9;
  velocityY = 0;

  obstacles: Array<{ position: number }> = [];
  gameInterval: any;
  score = 0;
  isGameOver = false;

  ngOnInit() {
    this.startGame();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      if (this.isGameOver) {
        this.resetGame();
      } else if (!this.isJumping) {
        this.jump();
      }
    }
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      this.updateGame();
    }, 20);

    // Spawn obstacles periodically
    setInterval(() => {
      if (!this.isGameOver) {
        this.spawnObstacle();
      }
    }, 2000);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocityY = 15;
    }
  }

  updateGame() {
    if (this.isGameOver) return;

    // Update dino position
    if (this.isJumping) {
      this.velocityY -= this.gravity;
      this.dinoBottom += this.velocityY;

      if (this.dinoBottom <= 0) {
        this.dinoBottom = 0;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }

    // Update obstacles
    this.obstacles.forEach(obstacle => {
      obstacle.position -= 5;

      // Check collision
      if (this.checkCollision(obstacle)) {
        this.gameOver();
      }
    });

    // Remove obstacles that are off screen
    this.obstacles = this.obstacles.filter(obs => obs.position > -20);

    // Update score
    this.score++;
  }

  spawnObstacle() {
    this.obstacles.push({
      position: 600
    });
  }

  checkCollision(obstacle: { position: number }): boolean {
    const dinoLeft = 50;
    const dinoRight = dinoLeft + 40;
    const dinoTop = this.dinoBottom;
    const dinoBottom = this.dinoBottom + 60;

    const obsLeft = obstacle.position;
    const obsRight = obstacle.position + 20;
    const obsTop = 0;
    const obsBottom = 40;

    return !(
      dinoBottom <= obsTop ||
      dinoTop >= obsBottom ||
      dinoRight <= obsLeft ||
      dinoLeft >= obsRight
    );
  }

  gameOver() {
    this.isGameOver = true;
    clearInterval(this.gameInterval);
  }

  resetGame() {
    this.isGameOver = false;
    this.score = 0;
    this.obstacles = [];
    this.dinoBottom = 0;
    this.isJumping = false;
    this.velocityY = 0;
    this.startGame();
  }
}
