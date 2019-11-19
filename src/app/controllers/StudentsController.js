import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const students = await Students.create({
      name: 'Jefferson Corrêa Braga',
      email: 'jefferson.braga.correa@gmail.com',
      idade: '29',
      peso: 73,
      altura: 1.71,
    });
    return res.json(students);
  }
}

export default new StudentsController();
