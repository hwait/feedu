import { saveAs } from 'file-saver';
import { Document, Packer } from 'docx';
import moment from 'moment';
import 'moment/locale/ru';

const SchedulesDocx = (schedules, ds, user) => {
	var doc = new Document(undefined, {
		top: 360,
		right: 1440,
		bottom: 360,
		left: 1440
	});
	doc.Styles.createParagraphStyle('Normal', 'Normal').basedOn('Normal').next('Normal').quickFormat().font('Calibri');

	doc.Styles
		.createParagraphStyle('Title', 'Title')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.font('Calibri Light')
		.color('000000')
		.underline('single', '000000')
		.bold()
		.right()
		.size(16);
	doc.Styles
		.createParagraphStyle('Heading1', 'Heading 1')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.font('Calibri')
		.color('999999')
		.bold()
		.size(50)
		.spacing({ before: 240 });
	doc.Styles
		.createParagraphStyle('Heading2', 'Heading 2')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.font('Bruskovaya')
		//.right()
		//.underline('single', '000000')
		.spacing({ before: 80, after: 0 })
		.indent(720)
		.size(32);
	doc.Styles
		.createParagraphStyle('Heading3', 'Heading 3')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.color('000000')
		.font('a_Assuan')
		.size(24)
		.spacing({ before: 20, after: 0 });
	let date = moment(ds);
	doc.createParagraph(`${user}. Расписание`).title();
	for (let i = 0; i < 7; i++) {
		const items = schedules.filter((x) => x.ts.includes(date.format('YYYY-MM-DD')));
		if (items.length > 0) {
			doc.createParagraph(date.format('DD MMMM, dddd')).heading1();
			let n = 0;
			items.forEach((schedule) => {
				const { lesson, ts, dur } = schedule;
				const from = moment(ts);
				const { name, nmb, papers, tasks, videos, course } = lesson;
				doc
					.createParagraph(
						`${n + 1}. ${from.format('HH:mm')}-${from.add(dur, 'm').format('HH:mm')} - ${course.name}:`
					)
					.heading2();
				doc.createParagraph(`№${nmb} ${name}`).heading3();
				if (papers.length > 0)
					papers.forEach((paper) => {
						doc
							.createParagraph(
								`§ ${paper.paragraph} ${paper.book.author} // ${paper.book.name}, ${paper.book.year}`
							)
							.bullet();
					});
				if (videos.length > 0)
					videos.forEach((video) => {
						doc.createParagraph(`► [${video.dur} мин.] ${video.link}`).bullet();
					});
				if (tasks.length > 0)
					tasks.forEach((task) => {
						doc
							.createParagraph(
								`℗ ${task.nmb} ${task.book.author} // ${task.book.name}, ${task.book.year}`
							)
							.bullet();
					});
				n++;
			});
		}
		date.add(1, 'day');
	}
	var packer = new Packer();
	packer.toBlob(doc).then((blob) => {
		saveAs(blob, `Schedule - ${user} ${date.add(-7, 'day').format('DD MMMM')}.docx`);
	});
};

export default SchedulesDocx;
